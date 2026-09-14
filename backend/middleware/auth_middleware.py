from flask import jsonify, request
import jwt

from config import JWT_SECRET_KEY


def token_required():

    def decorator(func):

        def wrapper(*args, **kwargs):

            auth_header = request.headers.get("Authorization")

            if not auth_header:
                return jsonify({
                    "success": False,
                    "message": "Authorization Token Required"
                }), 401

            try:
                token = auth_header.split(" ")[1]

                decoded = jwt.decode(
                    token,
                    JWT_SECRET_KEY,
                    algorithms=["HS256"]
                )

                request.user = decoded

            except jwt.ExpiredSignatureError:
                return jsonify({
                    "success": False,
                    "message": "Token Expired"
                }), 401

            except jwt.InvalidTokenError:
                return jsonify({
                    "success": False,
                    "message": "Invalid Token"
                }), 401

            return func(*args, **kwargs)

        wrapper.__name__ = func.__name__

        return wrapper

    return decorator