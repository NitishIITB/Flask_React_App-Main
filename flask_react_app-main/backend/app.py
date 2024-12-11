from flask import Flask, jsonify
from flask_smorest import Api
from db import db
from pymongo import MongoClient
from resources.car import blp as CarBlueprint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["API_TITLE"] = "Cars REST API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True

CORS(app)
# db = SQLAlchemy(app)
db.init_app(app)
api = Api(app)

with app.app_context():
    db.create_all()

api.register_blueprint(CarBlueprint)

if __name__ == "__main__":
    app.run(debug=True)