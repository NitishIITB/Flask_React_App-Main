from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import CarModel
from schemas import CarSchema


blp = Blueprint("Cars", __name__, description="Operations on cars")

@blp.route("/car/<string:car_id>")
class Car(MethodView):
    @blp.response(200, CarSchema)
    def get(self, car_id):
        car = CarModel.query.get_or_404(car_id)
        return car

    def delete(self, car_id):
        car = CarModel.query.get_or_404(car_id)
        db.session.delete(car)
        db.session.commit()
        return {"message": "Car deleted"}, 200


@blp.route("/car")
class CarList(MethodView):
    @blp.response(200, CarSchema(many=True))
    def get(self):
        print("all")
        all = CarModel.query.all()
        print(all)
        return all

    @blp.arguments(CarSchema)
    @blp.response(201, CarSchema)
    def post(self, car_data):
        print(car_data)
        car = CarModel(**car_data)
        print(car)
        try:
            db.session.add(car)
            db.session.commit()
        except IntegrityError:
            abort(
                400,
                message="A car with that name already exists.",
            )
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the car.")

        return car