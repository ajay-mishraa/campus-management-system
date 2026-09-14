from flask import Blueprint

from controllers.student_controller import (
    get_all_students,
    add_student,
    update_student,
    delete_student
)

from middleware.auth_middleware import token_required
from middleware.role_middleware import role_required


student_bp = Blueprint("student", __name__)


# ==========================================================
# Get All Students
# Admin + Faculty + Student
# ==========================================================
@student_bp.route("/students", methods=["GET"])
@token_required()
@role_required("admin", "faculty", "student")
def get_students_route():
    return get_all_students()


# ==========================================================
# Add Student
# Admin + Faculty
# ==========================================================
@student_bp.route("/students", methods=["POST"])
@token_required()
@role_required("admin", "faculty")
def add_student_route():
    return add_student()


# ==========================================================
# Update Student
# Admin + Faculty
# ==========================================================
@student_bp.route("/students/<int:id>", methods=["PUT"])
@token_required()
@role_required("admin", "faculty")
def update_student_route(id):
    return update_student(id)


# ==========================================================
# Delete Student
# Admin Only
# ==========================================================
@student_bp.route("/students/<int:id>", methods=["DELETE"])
@token_required()
@role_required("admin")
def delete_student_route(id):
    return delete_student(id)