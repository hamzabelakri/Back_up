from mongoengine import DynamicDocument, IntField, ListField, DateTimeField, DictField, StringField,BooleanField

class Shift_Mongo_Document(DynamicDocument):
    operator_id = IntField()
    start_shift = DateTimeField(required=True)
    end_shift = DateTimeField()
    transactions = ListField()
    events = ListField()
    zr_shift_id=IntField()
    shift_sync_zr = BooleanField(default=False)
    shift_sync_back_office = BooleanField(default=False)
