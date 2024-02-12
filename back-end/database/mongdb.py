from mongoengine import connect, DoesNotExist, errors, ListField, ReferenceField, Document, DynamicDocument, StringField, IntField
from config.config import DB_URL, DB_PORT, DATABASE_NAME


# connect(DATABASE_NAME, host=DB_URL, port=27017)
# connect(DATABASE_NAME, host=DB_URL, username=DB_USERNAME, password=DB_PASSWORD,
#         port=DB_PORT, authentication_source='admin')


class MongoDBHandler:
    def __init__(self):
        self.db_name = DATABASE_NAME
        self.host = DB_URL
        self.port = DB_PORT
        self.connection = None

    def connect_to_database(self):
        try:
            self.connection = connect(self.db_name,host=self.host, port=self.port, alias='default', serverSelectionTimeoutMS=3000)
            
        except errors.ConnectionError as e:
            print(f"Error inti to MongoDB: {e}")

    def disconnect_from_database(self):
        if self.connection:
            self.connection.close()
            print("Disconnected from MongoDB.")

    def reconnect_to_database(self):
        self.disconnect_from_database()
        self.connect_to_database()

try:
    M1 = MongoDBHandler()
    M1.connect_to_database()
    M1.connection.get_database(DATABASE_NAME).list_collection_names()
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")



# # Example Usage:
# from datetime import datetime

# connect_to_db = MongoDBHandler(db_name='example_db', host='localhost', port=27017)

# # Define a simple document model
# class User(Document):
#     name = StringField(required=True)
#     age = IntField()
#     created_at = StringField(default=str(datetime.now()))

# # Connect to the database
# connect_to_db.connect_to_database()

# # Add a document
# user_data = {'name': 'John Doe', 'age': 25}
# connect_to_db.add_document(User, user_data)

# # Get a document
# user_id = str(User.objects.first().id)
# connect_to_db.get_document(User, user_id)

# # Edit a document
# updated_data = {'age': 26}
# connect_to_db.edit_document(User, user_id, updated_data)

# # Search documents
# search_results = connect_to_db.search_documents(User, 'name', 'John Doe')

# # Delete a document
# connect_to_db.delete_document(User, user_id)

# # Disconnect from the database
# connect_to_db.disconnect_from_database()
