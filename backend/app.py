from flask import Flask
from flask_cors import CORS
import os

from routes.subject import subject_bp
from routes.auth import auth_bp
from routes.student import student_bp
from routes.faculty import faculty_bp
from routes.course import course_bp
from routes.attendance_routes import attendance_bp
from routes.marks_routes import marks_bp
from routes.result_routes import result_bp
from routes.dashboard_routes import dashboard_bp

from database.connection import get_db_connection
from error_handler import register_error_handlers


# Flask App
app = Flask(__name__)

# CORS Configuration
frontend_url = os.getenv("FRONTEND_URL")

if frontend_url:
    CORS(
        app,
        resources={
            r"/api/*": {"origins": [frontend_url]},
            r"/db-test": {"origins": [frontend_url]},
        },
    )
else:
    CORS(app)

# Register Error Handlers
register_error_handlers(app)

# Register Blueprints
app.register_blueprint(subject_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(student_bp, url_prefix="/api")
app.register_blueprint(faculty_bp, url_prefix="/api")
app.register_blueprint(course_bp, url_prefix="/api")
app.register_blueprint(attendance_bp, url_prefix="/api")
app.register_blueprint(marks_bp, url_prefix="/api")
app.register_blueprint(result_bp, url_prefix="/api")
app.register_blueprint(dashboard_bp, url_prefix="/api")


# Home Route
@app.route("/")
def home():
    return {
        "success": True,
        "message": "Campus Management System Backend is Running..."
    }, 200


# Database Connection Test
@app.route("/db-test")
def db_test():
    connection = None

    try:
        connection = get_db_connection()

        if connection:
            return {
                "success": True,
                "message": "Database Connected Successfully"
            }, 200

        return {
            "success": False,
            "message": "Database Connection Failed"
        }, 503

    except Exception:
        app.logger.exception("Database connection test failed")

        return {
            "success": False,
            "message": "Database Connection Failed"
        }, 503

    finally:
        if connection:
            connection.close()


# Local Development Server
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", 5000)),
        debug=True
    )