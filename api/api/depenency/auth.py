import base64
import logging
from typing import Optional

import jwt
from fastapi import Header, status, HTTPException
from httpx import AsyncClient
from sqlmodel import select

from .db import get_db_session, safe_db_read
from ..model.orm import User
from ..settings import secure_settings

log = logging.getLogger(__name__)


async def validate_dynamic_jwt(jwt_: str) -> dict:
    async with AsyncClient() as client:
        r = await client.get(
            f"https://app.dynamicauth.com/api/v0/environments/{secure_settings.dynamic_env_id}/keys",
            headers={"Authorization": f"Bearer {secure_settings.dynamic_api_key}"})
        if r.is_success:
            env_keys = r.json()
            # log.debug(env_keys)

            raw_header_content = jwt.get_unverified_header(jwt_)
            # log.debug(f"Raw header content: {raw_header_content}")

            decoded_key = base64.b64decode(env_keys["key"]["publicKey"])
            # log.debug(f"Decoded Key: {decoded_key}")

            decoded = jwt.decode(jwt_, decoded_key, algorithms=["RS256"],
                                 options={"verify_aud": False, "verify_signature": True})
            log.debug(f"Decoded JWT: {decoded}")
            return decoded
        else:
            log.info(r.status_code)
            log.info(r.text)
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)


async def handle_dynamic_jwt(x_d_jwt: str = Header(None)) -> {}:
    if x_d_jwt is not None:
        log.info(f"Got a Dynamic JWT")
        dynamic_response = await validate_dynamic_jwt(x_d_jwt)
        return dynamic_response
    else:
        log.info(f"No Dynamic JWT")
        return {}


async def get_auth_user(x_d_jwt: str = Header(None)) -> User:
    db_ = next(get_db_session())
    if x_d_jwt is None or x_d_jwt == "undefined":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing JWT")
    else:
        try:
            jwt_user = await handle_dynamic_jwt(x_d_jwt)
            log.info(f"Got valid JWT, getting user: {jwt_user.get('email', '')}")
            db_user = safe_db_read(db_.exec(select(User).where(User.email == jwt_user.get("email", ""))).one, 403)
            return db_user
        except HTTPException as not_found:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
