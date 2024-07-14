from typing import Optional, List

from pydantic import BaseModel


class CreateUserPayload(BaseModel):
    name: str
    email: str


class CreateProposalPayload(BaseModel):
    title: str
    description: str
    closes_at: Optional[int]
    price: float


class VotePayload(BaseModel):
    vote: bool
