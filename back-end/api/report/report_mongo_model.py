from mongoengine import ListField, ReferenceField, Document, DynamicDocument, StringField, IntField, FloatField,DictField
from datetime import datetime
#from database.mongdb import M1

class Report_document(DynamicDocument):
    user = StringField(required=True)
    shift = IntField(required=True)
    created_at = StringField(default=str(datetime.now()))
    transactions = StringField(default='None')
    lpn = StringField(default='None')
    cardtype = StringField(default='None')
    clientip = StringField(required=True)
    
class Query_document(DynamicDocument):
    name = StringField(required=True)
    description = StringField(required=True)    

    def __repr__(self):
        return f'user:{self.user} shift{self.shift}'

class Item(DynamicDocument):
    name = StringField(required=True)
    price = IntField(required=True)

class Order(DynamicDocument):
    order_number = StringField(required=True)
    items = ListField(ReferenceField(Item))

class Shift_Report(Document):
    ArticleID = IntField()
    lpn = StringField()
    price = FloatField()
    carteType = StringField()
    duration = StringField()

class Shift_Report_Mongo_Document(DynamicDocument):
    headerpart = DictField()
    data = ListField() 

class Shift_Report_Mongo_Document(DynamicDocument):
    headerpart = DictField()
    data = ListField() 