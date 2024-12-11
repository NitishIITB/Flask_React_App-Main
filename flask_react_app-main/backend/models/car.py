from db import db


class CarModel(db.Model):
    __tablename__ = "cars"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    brand = db.Column(db.String(80), nullable=False)
    make = db.Column(db.String(80), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    km = db.Column(db.Integer, nullable=True)
    cm3 = db.Column(db.Integer, nullable=True)