from flask import jsonify, request
from database.connection import get_db_connection
from middleware.auth_middleware import token_required
from middleware.role_middleware import role_required


# ==========================================================
# GET STUDENT RESULT
# ==========================================================
@token_required()
@role_required("admin", "student")
def get_student_result(student_id):

    user = request.user
    role = user.get("role")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # ------------------------------------------------------
    # STUDENT
    # Student can see only their own result
    # ------------------------------------------------------
    if role == "student":

        cursor.execute("""
            SELECT id
            FROM students
            WHERE user_id = %s
        """, (user.get("id"),))

        student = cursor.fetchone()

        if not student:
            cursor.close()
            conn.close()

            return jsonify({
                "success": False,
                "message": "Student record not found"
            }), 404

        student_id = student["id"]

    # ------------------------------------------------------
    # ADMIN
    # Admin can see requested student's result
    # ------------------------------------------------------

    cursor.execute("""
        SELECT
            students.id AS student_id,
            students.enrollment_no,
            subjects.id AS subject_id,
            subjects.subject_code,
            subjects.subject_name,
            marks.exam_type,
            marks.marks,
            marks.max_marks
        FROM marks
        JOIN students
            ON marks.student_id = students.id
        JOIN subjects
            ON marks.subject_id = subjects.id
        WHERE students.id = %s
        ORDER BY subjects.id, marks.exam_type
    """, (student_id,))

    records = cursor.fetchall()

    cursor.close()
    conn.close()

    if not records:
        return jsonify({
            "success": False,
            "message": "No marks found for this student"
        }), 404

    # ------------------------------------------------------
    # CALCULATE RESULT
    # ------------------------------------------------------

    total_marks = sum(
        float(row["marks"])
        for row in records
    )

    total_max_marks = sum(
        float(row["max_marks"])
        for row in records
    )

    percentage = 0

    if total_max_marks > 0:
        percentage = round(
            (total_marks / total_max_marks) * 100,
            2
        )

    result = "PASS" if percentage >= 40 else "FAIL"

    return jsonify({
        "success": True,

        "student": {
            "id": records[0]["student_id"],
            "enrollment_no": records[0]["enrollment_no"]
        },

        "marks": records,

        "summary": {
            "total_marks": total_marks,
            "total_max_marks": total_max_marks,
            "percentage": percentage,
            "result": result
        }
    }), 200