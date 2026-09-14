from flask import request, jsonify

from database.connection import get_db_connection
from middleware.auth_middleware import token_required
from middleware.role_middleware import role_required


# ==========================================================
# GET ALL SUBJECTS
# Admin + Faculty + Student
# ==========================================================
@token_required()
@role_required("admin", "faculty", "student")
def get_all_subjects():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            id,
            subject_code,
            subject_name,
            course,
            semester,
            credits,
            faculty_id
        FROM subjects
        ORDER BY id
    """)

    subjects = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "subjects": subjects
    }), 200