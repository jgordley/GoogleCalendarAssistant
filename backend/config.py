from pydantic import BaseSettings


class Settings(BaseSettings):
    mongodb_uri: str
    mongodb_database: str


settings = Settings()
