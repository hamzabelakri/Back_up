from mongoengine import Document, StringField, DictField


class Button_Mongo_Model(Document):
    img = StringField()
    title = StringField()
    action = DictField()