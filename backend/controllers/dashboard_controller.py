from flask import jsonify
from database.connection import get_db_connection
from middleware.auth_middleware import token_required
from middleware.role_middleware import role_required


@token_required()
@role_required("admin")
def admin_dashboard_stats():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Total Users
    cursor.execute("SELECT COUNT(*) AS total_users FROM users")
    total_users = cursor.fetchone()["total_users"]

    # Total Students
    cursor.execute("SELECT COUNT(*) AS total_students FROM students")
    total_students = cursor.fetchone()["total_students"]

    # Total Faculty
    cursor.execute("""
        SELECT COUNT(*) AS total_faculty
        FROM users
        WHERE role = 'faculty'
    """)
    total_faculty = cursor.fetchone()["total_faculty"]

    # Total Courses
    cursor.execute("SELECT COUNT(*) AS total_courses FROM courses")
    total_courses = cursor.fetchone()["total_courses"]

    # Total Subjects
    cursor.execute("SELECT COUNT(*) AS total_subjects FROM subjects")
    total_subjects = cursor.fetchone()["total_subjects"]

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "dashboard": {
            "total_users": total_users,
            "total_students": total_students,
            "total_faculty": total_faculty,
            "total_courses": total_courses,
            "total_subjects": total_subjects
        }
    }), 200