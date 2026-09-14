from flask import Blueprint

from controllers.marks_controller import (
    get_marks,
    add_marks,
    update_marks,
    delete_marks
)


marks_bp = Blueprint("marks", __name__)


# Get Marks
marks_bp.route("/marks", methods=["GET"])(get_marks)


# Add Marks
marks_bp.route("/marks", methods=["POST"])(add_marks)


# Update Marks
marks_bp.route("/marks/<int:id>", methods=["PUT"])(update_marks)


# Delete Marks
marks_bp.route("/marks/<int:id>", methods=["DELETE"])(delete_marks)