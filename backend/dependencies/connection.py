from pymongo import MongoClient
import time
from config import settings

connected = False
while not connected:
    try:
        client = MongoClient(settings.mongodb_url)
        db = client[settings.database_name]
        connected = True
    except:
        print("Could not connect to MongoDB. Trying again in 5 seconds...")
        time.sleep(5)
