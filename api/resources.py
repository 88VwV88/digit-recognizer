from flask_restful import Resource, Api
from flask import request
from .train_model import model
import numpy as np


api = Api()


class PredictionResource(Resource):
    def post(self) -> tuple[str, int | list[float]]:
        data: dict[str, str] = request.get_json()
        if data is None or (pixels := data.get("pixels")) is None:
            return "missing pixel data to make prediction", 422

        pixels = np.array([pixels], dtype=np.float32)
        return model.predict(pixels).tolist()


api.add_resource(PredictionResource, "/api/predict")
