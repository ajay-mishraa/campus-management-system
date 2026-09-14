from flask import Blueprint
from controllers.dashboard_controller import admin_dashboard_stats


dashboard_bp = Blueprint("dashboard", __name__)


# Admin Dashboard Statistics
dashboard_bp.route(
    "/dashboard/admin",
    methods=["GET"]
)(admin_dashboard_stats)