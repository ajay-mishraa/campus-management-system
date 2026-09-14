from flask import jsonify, request
from functools import wraps


def role_required(*allowed_roles):

    def decorator(func):

        @wraps(func)
        def wrapper(*args, **kwargs):

            user = getattr(request, "user", None)

            if not user:
                return jsonify({
                    "success": False,
                    "message": "Authentication Required"
                }), 401

            if user.get("role") not in allowed_roles:
                return jsonify({
                    "success": False,
                    "message": "Access Denied"
                }), 403

            return func(*args, **kwargs)

        return wrapper

    return decorator