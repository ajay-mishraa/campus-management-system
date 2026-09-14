from flask import Blueprint
from controllers.result_controller import get_student_result


result_bp = Blueprint("result", __name__)


# Get Student Result
result_bp.route(
    "/result/<int:student_id>",
    methods=["GET"]
)(get_student_result)