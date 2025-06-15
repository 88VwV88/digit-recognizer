import logging
from flask import Flask, render_template_string, send_from_directory
from api.resources import api
from api.config import AppConfig


app = Flask(__name__)
app.config.from_object(AppConfig)

print(app.debug)

if app.debug:
    from flask_cors import CORS

    CORS(app, resources={r"/api/*": {"origins": "*"}})
api.init_app(app)

logging.basicConfig(level=logging.INFO)

logging.getLogger("flask_cors").level = logging.DEBUG


@app.errorhandler(500)
def server_error(e):
    logging.exception("An error occurred during a request. %s", e)
    return "An internal error occurred", 500


@app.route("/")
def home():
    return send_from_directory("dist", "index.html")


@app.route("/<path:path>")
def index(path: str):
    return send_from_directory("public", path)


if __name__ == "__main__":
    app.run()
