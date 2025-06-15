import os
from flask import Config
import secrets


class AppConfig(Config):
    SECRET_KEY = (
        os.environ.get(
            "SECRET_KEY",
            secrets.token_hex(16),
        ),
    )
