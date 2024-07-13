import logging
import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    test_mode: bool = os.environ.get("IS_TEST_MODE", True)
    log_level: str = os.environ.get("LOG_LEVEL", "INFO")

    db_user: str = os.environ.get("DB_USER", "postgres.dbzdqvxyyeldmlreuhhh")
    db_host: str = os.environ.get("DB_HOST", "aws-0-eu-west-2.pooler.supabase.com")
    db_port: str = os.environ.get("DB_PORT", "6543")
    db_handler: str = os.environ.get("DB_HANDLER", "postgresql")
    db_name: str = os.environ.get("DB_NAME", "postgres")
    cors_origins: str = os.environ.get("CORS_ORIGINS", "")


class SecureSettings(BaseSettings):
    db_password: str = os.environ.get("DB_PASSWORD", "hWjosJGYX36xvvuT")
    dynamic_env_id: str = os.environ.get("DYNAMIC_ENV_ID", "099cc9fb-5b06-4c40-8218-4fe90f319127")
    dynamic_api_key: str = os.environ.get("DYNAMIC_API_KEY",
                                          "dyn_MUljopVoxnmvt845pCtbURfCfTIby9rr2fO20YyX6AGteF52yI03G5So")


settings = Settings()
secure_settings = SecureSettings()

if settings.test_mode:
    settings.log_level = "DEBUG"
    logging.getLogger("httpcore").setLevel("INFO")
