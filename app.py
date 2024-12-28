from flask import Flask, render_template, request
from train_model import model
import numpy as np
import pandas as pd

app = Flask("digits_app")


@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        points = request.json["pixels"]
        digit = model.predict(
            pd.DataFrame([np.ravel(np.array(points).T)], columns=model.feature_names_in_)
        )
        return {"digit": f"{digit}"}
    return render_template("index.html")


if __name__ == "__main__":
    app.run()
