import time
import uuid
from typing import Optional, List

from sqlalchemy import Column, BigInteger, UniqueConstraint
from sqlalchemy.orm import RelationshipProperty
from sqlmodel import SQLModel, Field, Relationship


class User(SQLModel, table=True):
    uid: str = Field(primary_key=True, default_factory=lambda: f"uid-{uuid.uuid4().hex}")
    created_at: int = Field(sa_column=Column(BigInteger()), default_factory=lambda: time.time() * 1000)
    name: Optional[str]
    email: Optional[str] = Field(index=True)
    dynamic_uid: Optional[str] = Field(index=True, description="The UID from Dynamic Labs (JWT derived)")
    wallet_address: Optional[str] = Field(index=True)
    proposals: Optional[List["Proposal"]] = Relationship(
        back_populates="user",
        sa_relationship=RelationshipProperty(
            "Proposal",
            primaryjoin="foreign(User.uid) == Proposal.author_id",
            uselist=True,
            viewonly=False
        )
    )
    votes: Optional[List["Vote"]] = Relationship(
        back_populates="user",
        sa_relationship=RelationshipProperty(
            "Vote",
            primaryjoin="foreign(User.uid) == Vote.voter_id",
            uselist=True,
            viewonly=False
        )
    )


class Proposal(SQLModel, table=True):
    pid: str = Field(primary_key=True, default_factory=lambda: f"aid-{uuid.uuid4().hex}")
    created_at: int = Field(sa_column=Column(BigInteger()), default_factory=lambda: time.time() * 1000)
    title: str
    description: str
    closes_at: int = Field(sa_column=Column(BigInteger()), default_factory=lambda: time.time() * 1000 + 604800000)  # 1 week
    onchain_id: str
    price: float = Field(default=0)
    author_id: str
    author: User = Relationship(
        back_populates="proposal",
        sa_relationship=RelationshipProperty(
            "User",
            primaryjoin="foreign(Proposal.author_id) == User.uid",
            uselist=False,
            viewonly=True
        )
    )
    votes: Optional[List["Vote"]] = Relationship(
        back_populates="proposal",
        sa_relationship=RelationshipProperty(
            "Vote",
            primaryjoin="foreign(Proposal.pid) == Vote.proposal_id",
            uselist=True,
            viewonly=False
        )
    )


class Vote(SQLModel, table=True):
    __table_args__ = (UniqueConstraint("voter_id", "proposal_id", name="unique_voter_id_change_id"),)
    created_at: int = Field(sa_column=Column(BigInteger()), default_factory=lambda: time.time() * 1000)
    vid: str = Field(primary_key=True, default_factory=lambda: f"vid-{uuid.uuid4().hex}")
    proposal_id: str = Field(index=True)
    proposal: Proposal = Relationship(
        back_populates="votes",
        sa_relationship=RelationshipProperty(
            "Proposal",
            primaryjoin="foreign(Vote.proposal_id) == Proposal.pid",
            uselist=False,
            viewonly=True
        )
    )
    voter_id: str = Field(index=True)
    voter: User = Relationship(
        back_populates="votes",
        sa_relationship=RelationshipProperty(
            "User",
            primaryjoin="foreign(Vote.voter_id) == User.uid",
            uselist=False,
            viewonly=True
        )
    )
    vote: bool
