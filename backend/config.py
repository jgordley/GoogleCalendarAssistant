from pydantic import BaseSettings


class Settings(BaseSettings):
    mongodb_uri: str
    mongodb_password: str
    mongodb_user: str
    mongodb_database: str


settings = Settings()
