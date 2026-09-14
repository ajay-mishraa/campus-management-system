from flask import Blueprint

from controllers.course_controller import (
    get_all_courses,
    add_course,
    update_course,
    delete_course
)


course_bp = Blueprint("course", __name__)


# ==========================================================
# Get All Courses
# ==========================================================
course_bp.route("/courses", methods=["GET"])(get_all_courses)


# ==========================================================
# Add Course
# ==========================================================
course_bp.route("/courses", methods=["POST"])(add_course)


# ==========================================================
# Update Course
# ==========================================================
course_bp.route("/courses/<int:id>", methods=["PUT"])(update_course)


# ==========================================================
# Delete Course
# ==========================================================
course_bp.route("/courses/<int:id>", methods=["DELETE"])(delete_course)