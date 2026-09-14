from flask import request, jsonify
from database.connection import get_db_connection
from middleware.auth_middleware import token_required
from middleware.role_middleware import role_required
from validators.marks_validator import validate_marks_data


# ==========================================================
# GET MARKS
# ==========================================================
@token_required()
def get_marks():

    user = request.user
    user_id = user.get("id")
    role = user.get("role")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    if role in ["admin", "faculty"]:

        cursor.execute("""
            SELECT
                marks.id,
                marks.student_id,
                students.enrollment_no,
                students.user_id,
                marks.subject_id,
                subjects.subject_code,
                subjects.subject_name,
                marks.exam_type,
                marks.marks,
                marks.max_marks
            FROM marks
            JOIN students ON marks.student_id = students.id
            JOIN subjects ON marks.subject_id = subjects.id
            ORDER BY marks.id DESC
        """)

    elif role == "student":

        cursor.execute("""
            SELECT
                marks.id,
                marks.student_id,
                students.enrollment_no,
                marks.subject_id,
                subjects.subject_code,
                subjects.subject_name,
                marks.exam_type,
                marks.marks,
                marks.max_marks
            FROM marks
            JOIN students ON marks.student_id = students.id
            JOIN subjects ON marks.subject_id = subjects.id
            WHERE students.user_id = %s
            ORDER BY marks.id DESC
        """, (user_id,))

    else:
        cursor.close()
        conn.close()

        return jsonify({
            "success": False,
            "message": "Access Denied"
        }), 403

    marks = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "marks": marks
    }), 200


# ==========================================================
# ADD MARKS
# ==========================================================
@token_required()
@role_required("admin")
def add_marks():

    data = request.get_json()

    is_valid, error_message = validate_marks_data(data)

    if not is_valid:
        return jsonify({
            "success": False,
            "message": error_message
        }), 400

    student_id = data["student_id"]
    subject_id = data["subject_id"]
    exam_type = data["exam_type"]
    marks = data["marks"]
    max_marks = data.get("max_marks", 100)

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO marks
        (student_id, subject_id, exam_type, marks, max_marks)
        VALUES (%s, %s, %s, %s, %s)
    """, (
        student_id,
        subject_id,
        exam_type,
        marks,
        max_marks
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Marks Added Successfully"
    }), 201


# ==========================================================
# UPDATE MARKS
# ==========================================================
@token_required()
@role_required("admin")
def update_marks(id):

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request data is required"
        }), 400

    exam_type = data.get("exam_type")
    marks = data.get("marks")
    max_marks = data.get("max_marks", 100)

    if not exam_type:
        return jsonify({
            "success": False,
            "message": "Exam type is required"
        }), 400

    if marks is None:
        return jsonify({
            "success": False,
            "message": "Marks are required"
        }), 400

    if not isinstance(marks, (int, float)):
        return jsonify({
            "success": False,
            "message": "Marks must be a number"
        }), 400

    if not isinstance(max_marks, (int, float)):
        return jsonify({
            "success": False,
            "message": "Maximum marks must be a number"
        }), 400

    if max_marks <= 0:
        return jsonify({
            "success": False,
            "message": "Maximum marks must be greater than 0"
        }), 400

    if marks < 0 or marks > max_marks:
        return jsonify({
            "success": False,
            "message": "Marks must be between 0 and maximum marks"
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE marks
        SET
            exam_type=%s,
            marks=%s,
            max_marks=%s
        WHERE id=%s
    """, (
        exam_type,
        marks,
        max_marks,
        id
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Marks Updated Successfully"
    }), 200


# ==========================================================
# DELETE MARKS
# ==========================================================
@token_required()
@role_required("admin")
def delete_marks(id):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM marks WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Marks Deleted Successfully"
    }), 200