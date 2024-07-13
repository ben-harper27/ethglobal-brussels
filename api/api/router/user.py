import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from starlette import status

from ..depenency.auth import handle_dynamic_jwt
from ..depenency.db import get_db_session, safe_db_read, safe_db_write, DBSession
from ..model.orm import User
from ..model.request import CreateUserRequest

log = logging.getLogger(__name__)
router = APIRouter(
    prefix="/v1/user",
    tags=["User"]
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(payload: CreateUserRequest,
                      jwt_data: Optional[dict] = Depends(handle_dynamic_jwt),
                      db: DBSession = Depends(get_db_session)):
    existing_user: User = safe_db_read(db.exec(select(User).where(User.email == payload.email)).one)
    if existing_user is not None:
        raise HTTPException(status_code=409, detail="User already exists")
    new_user = User(**payload.dict())
    if jwt_data is not None:
        log.info(f"Got jwt data on new user creation: {jwt_data}")
        new_user.email = jwt_data.get("email", None)
        new_user.dynamic_uid = jwt_data.get("sub", None)
        for credential in jwt_data.get("verified_credentials", []):
            if "address" in credential:
                new_user.wallet_address = credential["address"]
                break
    safe_db_write([new_user], db)
    response = {
        "user": new_user.dict(),
    }
    return response
