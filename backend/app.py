from flask import Flask
from flask_cors import CORS

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


# ==========================================================
# Flask App
# ==========================================================
app = Flask(__name__)

# Enable CORS
CORS(app)


# ==========================================================
# Register Error Handlers
# ==========================================================
register_error_handlers(app)


# ==========================================================
# Register Blueprints
# ==========================================================

app.register_blueprint(subject_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(student_bp, url_prefix="/api")
app.register_blueprint(faculty_bp, url_prefix="/api")
app.register_blueprint(course_bp, url_prefix="/api")
app.register_blueprint(attendance_bp, url_prefix="/api")
app.register_blueprint(marks_bp, url_prefix="/api")
app.register_blueprint(result_bp, url_prefix="/api")
app.register_blueprint(dashboard_bp, url_prefix="/api")


# ==========================================================
# Home Route
# ==========================================================
@app.route("/")
def home():
    return {
        "success": True,
        "message": "🚀 Campus Management System Backend is Running..."
    }


# ==========================================================
# Check Database Connection
# ==========================================================
@app.route("/db-test")
def db_test():

    connection = get_db_connection()

    if connection:
        connection.close()

        return {
            "success": True,
            "message": "✅ Database Connected Successfully"
        }

    return {
        "success": False,
        "message": "❌ Database Connection Failed"
    }


# ==========================================================
# Run Server
# ==========================================================
if __name__ == "__main__":
    app.run(debug=True)