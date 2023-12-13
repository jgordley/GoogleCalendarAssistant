from pymongo import MongoClient, errors
from config import settings
import time
import logging

MAX_RETRIES = 10
RETRY_DELAY = 5  # seconds


def connect_to_mongo():
    client = MongoClient(
        settings.mongodb_uri, serverSelectionTimeoutMS=2000  # 2 seconds timeout
    )
    try:
        # The ismaster command is cheap and does not require auth.
        client.admin.command("ismaster")
        return client
    except errors.ServerSelectionTimeoutError as err:
        print(f"Could not connect to MongoDB: {err}")
        return None


client = None
for _ in range(MAX_RETRIES):
    client = connect_to_mongo()
    if client:
        break
    print(f"Failed to connect. Retrying in {RETRY_DELAY} seconds...")
    time.sleep(RETRY_DELAY)

if not client:
    raise RuntimeError("Max retries reached. Could not connect to MongoDB.")

print("Connected to MongoDB successfully.")

db = client[settings.mongodb_database]
