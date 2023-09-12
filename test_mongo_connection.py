from pymongo import MongoClient

def test_mongo_connection():
    try:
        # Create a MongoDB client
        client = MongoClient("mongodb://root:yourpassword@localhost:27017/")
        
        # Get the database instance
        db = client.yourdbname

        # Create a new collection or get the existing collection
        collection = db.test_collection

        # Insert a new document
        result = collection.insert_one({"message": "Hello, MongoDB!"})
        
        # Retrieve the inserted document
        retrieved_document = collection.find_one({"_id": result.inserted_id})
        
        print("Document inserted successfully:")
        print(retrieved_document)
        
        # Close the connection
        client.close()

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    test_mongo_connection()

