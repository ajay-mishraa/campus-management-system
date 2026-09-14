from flask import Blueprint

from controllers.faculty_controller import (
    get_all_faculty,
    add_faculty,
    update_faculty,
    delete_faculty
)


faculty_bp = Blueprint("faculty", __name__)


faculty_bp.route("/faculty", methods=["GET"])(get_all_faculty)

faculty_bp.route("/faculty", methods=["POST"])(add_faculty)

faculty_bp.route("/faculty/<int:id>", methods=["PUT"])(update_faculty)

faculty_bp.route("/faculty/<int:id>", methods=["DELETE"])(delete_faculty)