from mongoengine import  DynamicDocument, StringField, EmailField

class Operator_Mongo_Document(DynamicDocument):
    name = StringField()
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)


class Admin_Mongo_Document(DynamicDocument):
    name = StringField()
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)