import logging
import traceback
from functools import lru_cache
from typing import List, Optional, Union, Callable

import sqlalchemy
from fastapi import HTTPException, status
from pydantic import BaseModel
from sqlalchemy.exc import NoResultFound, MultipleResultsFound, InvalidRequestError
from sqlmodel import Session as DBSession
from sqlmodel import create_engine, SQLModel

from ..errors import *
from ..settings import settings, secure_settings

log = logging.getLogger(__name__)


@lru_cache()
def get_engine():
    log.info(f"Connecting to DB: {settings.db_host} - {settings.db_name}")
    if secure_settings.db_password:
        connection_string = f"{settings.db_handler}://{settings.db_user}:{secure_settings.db_password}@" \
                            f"{settings.db_host}:{settings.db_port}/{settings.db_name}"
    else:
        connection_string = f"{settings.db_handler}://{settings.db_user}@" \
                            f"{settings.db_host}:{settings.db_port}/{settings.db_name}"
    return create_engine(connection_string,
                         pool_size=240,  # same as max concurrent requests. PS will LB this for free.
                         pool_recycle=3600,
                         pool_pre_ping=True,
                         max_overflow=128,
                         echo_pool=True,
                         isolation_level="AUTOCOMMIT",
                         )


def make_migrations():
    log.info("Making migrations")
    SQLModel.metadata.create_all(get_engine())


def get_db_session():
    with DBSession(get_engine(), expire_on_commit=False) as db_session:
        try:
            yield db_session
        except sqlalchemy.exc.PendingRollbackError as rollback:
            log.warning(f"DB Needs to rollback")
            log.warning(rollback)
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=DATABASE_ERROR)
        except sqlalchemy.exc.OperationalError as e:
            log.warning(e)
            log.warning(traceback.format_exc())
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=DATABASE_ERROR)
        finally:
            log.debug("Finally closing DB session")
            db_session.close()


def safe_db_write(objects: List[BaseModel], db: DBSession, refresh: bool = False):
    try:
        log.info(f"Writing {len(objects)} objects to DB")
        for obj in objects:
            log.debug(obj)
            db.add(obj)
        db.commit()
        if refresh:
            for obj in objects:
                db.refresh(obj)
    except sqlalchemy.exc.IntegrityError as integ_error:
        log.warning(integ_error)
        log.warning(f"Integrity Error")
        raise HTTPException(status_code=status.HTTP_418_IM_A_TEAPOT, detail=OBJECT_EXISTS)
    except Exception as e:
        log.error(e)
        log.error(traceback.format_exc())
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=DATABASE_ERROR)


def safe_db_read(db_call: Callable, raise_code: Optional[int] = None):
    try:
        response = db_call()
        log.info(f"Returning item: {response}")
    except InvalidRequestError as none:
        log.warning(f"Bad DB call")
        log.info(none)
        log.debug(traceback.format_exc())
        if raise_code is not None:
            raise HTTPException(status_code=raise_code)
        return None
    return response


def safe_db_delete(obj: SQLModel, db: DBSession):
    try:
        db.delete(obj)
        db.commit()
    except Exception as e:
        log.error(e)
        log.error(traceback.format_exc())
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=DATABASE_ERROR)


def close_db_before_agent_call(db: DBSession, pre_commit_txn: Optional[List[SQLModel]] = None):
    log.info("Closing DB before agent call")
    if pre_commit_txn is not None:
        log.info(f"Got pre-commit txn")
        log.debug(pre_commit_txn)
        safe_db_write(pre_commit_txn, db)
    db.close()


def refresh_db_session_mid_agent_call() -> DBSession:
    log.debug("Refreshing DB session mid agent call")
    return next(get_db_session())
