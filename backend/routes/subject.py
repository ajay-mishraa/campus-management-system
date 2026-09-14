from flask import Blueprint

from controllers.subject_controller import get_all_subjects


subject_bp = Blueprint("subject", __name__)


# ==========================================================
# Get All Subjects
# ==========================================================
@subject_bp.route("/subjects", methods=["GET"])
def get_subjects_route():
    return get_all_subjects()