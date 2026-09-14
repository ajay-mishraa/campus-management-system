from flask import Blueprint
from controllers.auth_controller import register, login, profile, admin_dashboard

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register_route():
    return register()


@auth_bp.route("/login", methods=["POST"])
def login_route():
    return login()

@auth_bp.route("/profile", methods=["GET"])
def profile_route():
    return profile()

@auth_bp.route("/admin", methods=["GET"])
def admin_route():
    return admin_dashboard()