from flask import Blueprint
from controllers.attendance_controller import (
    add_attendance,
    get_attendance,
    update_attendance,
    delete_attendance
)

attendance_bp = Blueprint("attendance", __name__)

attendance_bp.route("/attendance", methods=["POST"])(add_attendance)

attendance_bp.route("/attendance", methods=["GET"])(get_attendance)

attendance_bp.route("/attendance/<int:id>", methods=["PUT"])(update_attendance)

attendance_bp.route("/attendance/<int:id>", methods=["DELETE"])(delete_attendance)