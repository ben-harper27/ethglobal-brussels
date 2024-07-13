import logging
import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from starlette import status

from ..depenency.auth import get_auth_user
from ..depenency.db import get_db_session, safe_db_read, safe_db_write, DBSession
from ..model.orm import User, Proposal
from ..model.request import CreateProposalPayload

log = logging.getLogger(__name__)
router = APIRouter(
    prefix="/v1/proposal",
    tags=["Proposal"]
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_proposal(payload: CreateProposalPayload,
                          user: User = Depends(get_auth_user),
                          db: DBSession = Depends(get_db_session)):
    proposal = Proposal(
        title=payload.title,
        description=payload.description,
        price=payload.price,
        author_id=user.uid
    )
    safe_db_write([proposal], db)
    return proposal
