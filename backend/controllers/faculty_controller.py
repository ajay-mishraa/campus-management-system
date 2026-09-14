from flask import request, jsonify
from database.connection import get_db_connection
from middleware.auth_middleware import token_required
from middleware.role_middleware import role_required


# ==========================================================
# GET ALL FACULTY
# Admin Only
# ==========================================================
@token_required()
@role_required("admin")
def get_all_faculty():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            f.id,
            f.user_id,
            u.full_name,
            u.email,
            u.phone,
            f.employee_id,
            f.department,
            f.designation,
            f.qualification,
            f.experience
        FROM faculty f
        LEFT JOIN users u
            ON f.user_id = u.id
        ORDER BY f.id
    """)

    faculty = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "faculty": faculty
    }), 200


# ==========================================================
# ADD FACULTY
# Admin Only
# ==========================================================
@token_required()
@role_required("admin")
def add_faculty():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request data is required"
        }), 400

    user_id = data["user_id"]
    employee_id = data["employee_id"]
    department = data["department"]
    designation = data["designation"]
    qualification = data.get("qualification")
    experience = data.get("experience", 0)

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO faculty
        (
            user_id,
            employee_id,
            department,
            designation,
            qualification,
            experience
        )
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        user_id,
        employee_id,
        department,
        designation,
        qualification,
        experience
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Faculty Added Successfully"
    }), 201


# ==========================================================
# UPDATE FACULTY
# Admin Only
# ==========================================================
@token_required()
@role_required("admin")
def update_faculty(id):

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request data is required"
        }), 400

    department = data["department"]
    designation = data["designation"]
    qualification = data.get("qualification")
    experience = data.get("experience", 0)

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE faculty
        SET
            department=%s,
            designation=%s,
            qualification=%s,
            experience=%s
        WHERE id=%s
    """, (
        department,
        designation,
        qualification,
        experience,
        id
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Faculty Updated Successfully"
    }), 200


# ==========================================================
# DELETE FACULTY
# Admin Only
# ==========================================================
@token_required()
@role_required("admin")
def delete_faculty(id):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM faculty WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Faculty Deleted Successfully"
    }), 200