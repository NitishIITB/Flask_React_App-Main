from marshmallow import Schema,fields

class CarSchema(Schema):
    id = fields.Str(dump_only=True)
    name = fields.Str(required=True)
    brand = fields.Str(required=True)
    make = fields.Str(required=True)
    year = fields.Integer(required=True)
    price = fields.Integer(required=True)
    km = fields.Integer(required=False)
    cm3 = fields.Integer(required=False)