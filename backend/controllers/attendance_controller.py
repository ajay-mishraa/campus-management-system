from flask import request, jsonify
from database.connection import get_db_connection
from middleware.auth_middleware import token_required
from middleware.role_middleware import role_required
from validators.attendance_validator import validate_attendance_data


# ==========================================================
# GET ATTENDANCE
# ==========================================================
@token_required()
def get_attendance():

    user = request.user
    user_id = user.get("id")
    role = user.get("role")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # ------------------------------------------------------
    # ADMIN / FACULTY → ALL ATTENDANCE
    # ------------------------------------------------------
    if role in ["admin", "faculty"]:

        cursor.execute("""
            SELECT *
            FROM attendance
            ORDER BY attendance_date DESC
        """)

    # ------------------------------------------------------
    # STUDENT → ONLY OWN ATTENDANCE
    # ------------------------------------------------------
    elif role == "student":

        cursor.execute("""
            SELECT attendance.*
            FROM attendance
            INNER JOIN students
                ON attendance.student_id = students.id
            WHERE students.user_id = %s
            ORDER BY attendance.attendance_date DESC
        """, (user_id,))

    else:
        cursor.close()
        conn.close()

        return jsonify({
            "success": False,
            "message": "Access Denied"
        }), 403

    attendance = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "attendance": attendance
    }), 200


# ==========================================================
# ADD ATTENDANCE
# ==========================================================
@token_required()
@role_required("admin")
def add_attendance():

    data = request.get_json()

    is_valid, error_message = validate_attendance_data(data)

    if not is_valid:
        return jsonify({
            "success": False,
            "message": error_message
        }), 400

    student_id = data["student_id"]
    subject_id = data["subject_id"]
    attendance_date = data["attendance_date"]
    status = data["status"]

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO attendance
        (student_id, subject_id, attendance_date, status)
        VALUES (%s, %s, %s, %s)
    """, (
        student_id,
        subject_id,
        attendance_date,
        status
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Attendance Added Successfully"
    }), 201


# ==========================================================
# UPDATE ATTENDANCE
# ==========================================================
@token_required()
@role_required("admin")
def update_attendance(id):

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request data is required"
        }), 400

    status = data.get("status")

    if not status:
        return jsonify({
            "success": False,
            "message": "Status is required"
        }), 400

    allowed_status = ["Present", "Absent", "Leave"]

    if status not in allowed_status:
        return jsonify({
            "success": False,
            "message": "Status must be Present, Absent or Leave"
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE attendance
        SET status=%s
        WHERE id=%s
    """, (
        status,
        id
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Attendance Updated Successfully"
    }), 200


# ==========================================================
# DELETE ATTENDANCE
# ==========================================================
@token_required()
@role_required("admin")
def delete_attendance(id):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM attendance WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Attendance Deleted Successfully"
    }), 200