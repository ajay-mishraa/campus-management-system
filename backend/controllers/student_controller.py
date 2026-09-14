from flask import request, jsonify
from database.connection import get_db_connection
from middleware.auth_middleware import token_required
from middleware.role_middleware import role_required
from validators.student_validator import validate_student_data


# ==========================================================
# GET STUDENTS
# Admin + Faculty = All Students
# Student = Own Student Details
# ==========================================================
@token_required()
def get_all_students():

    user = request.user
    user_id = user.get("id")
    role = user.get("role")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # ------------------------------------------------------
    # ADMIN + FACULTY
    # Get all students with user information
    # ------------------------------------------------------
    if role in ["admin", "faculty"]:

        cursor.execute("""
            SELECT
                students.id,
                students.user_id,
                users.full_name,
                users.email,
                users.phone,
                students.enrollment_no,
                students.course,
                students.branch,
                students.semester,
                students.section,
                students.dob,
                students.gender,
                students.address
            FROM students
            INNER JOIN users
                ON students.user_id = users.id
            ORDER BY students.id
        """)

    # ------------------------------------------------------
    # STUDENT
    # Get only logged-in student's details
    # ------------------------------------------------------
    elif role == "student":

        cursor.execute("""
            SELECT
                students.id,
                students.user_id,
                users.full_name,
                users.email,
                users.phone,
                students.enrollment_no,
                students.course,
                students.branch,
                students.semester,
                students.section,
                students.dob,
                students.gender,
                students.address
            FROM students
            INNER JOIN users
                ON students.user_id = users.id
            WHERE students.user_id = %s
        """, (user_id,))

    # ------------------------------------------------------
    # OTHER ROLE
    # ------------------------------------------------------
    else:

        cursor.close()
        conn.close()

        return jsonify({
            "success": False,
            "message": "Access Denied"
        }), 403

    students = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "students": students
    }), 200


# ==========================================================
# ADD STUDENT
# Admin Only
# ==========================================================
@token_required()
@role_required("admin")
def add_student():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request data is required"
        }), 400

    is_valid, error_message = validate_student_data(data)

    if not is_valid:
        return jsonify({
            "success": False,
            "message": error_message
        }), 400

    user_id = data["user_id"]
    enrollment_no = data["enrollment_no"]
    course = data["course"]
    branch = data["branch"]
    semester = data["semester"]
    section = data["section"]
    dob = data["dob"]
    gender = data["gender"]
    address = data["address"]

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO students
        (
            user_id,
            enrollment_no,
            course,
            branch,
            semester,
            section,
            dob,
            gender,
            address
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """, (
        user_id,
        enrollment_no,
        course,
        branch,
        semester,
        section,
        dob,
        gender,
        address
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Student Added Successfully"
    }), 201


# ==========================================================
# UPDATE STUDENT
# Admin Only
# ==========================================================
@token_required()
@role_required("admin")
def update_student(id):

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request data is required"
        }), 400

    required_fields = [
        "course",
        "branch",
        "semester",
        "section",
        "dob",
        "gender",
        "address"
    ]

    for field in required_fields:

        if field not in data or data[field] in [None, ""]:

            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    if not isinstance(data["semester"], int):

        return jsonify({
            "success": False,
            "message": "Semester must be a number"
        }), 400

    if data["semester"] < 1 or data["semester"] > 8:

        return jsonify({
            "success": False,
            "message": "Semester must be between 1 and 8"
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE students
        SET
            course=%s,
            branch=%s,
            semester=%s,
            section=%s,
            dob=%s,
            gender=%s,
            address=%s
        WHERE id=%s
    """, (
        data["course"],
        data["branch"],
        data["semester"],
        data["section"],
        data["dob"],
        data["gender"],
        data["address"],
        id
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Student Updated Successfully"
    }), 200


# ==========================================================
# DELETE STUDENT
# Admin Only
# ==========================================================
@token_required()
@role_required("admin")
def delete_student(id):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM students WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Student Deleted Successfully"
    }), 200