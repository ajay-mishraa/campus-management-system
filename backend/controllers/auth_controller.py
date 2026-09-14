from flask import request, jsonify
from middleware.auth_middleware import token_required
from middleware.role_middleware import role_required
from database.connection import get_db_connection
from validators.auth_validator import validate_registration_data
import bcrypt
import jwt
import datetime
from config import JWT_SECRET_KEY


# ==========================================================
# REGISTER
# ==========================================================
def register():

    data = request.get_json()

    is_valid, error_message = validate_registration_data(data)

    if not is_valid:
        return jsonify({
            "success": False,
            "message": error_message
        }), 400

    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")
    role = data.get("role")

    if not full_name:
        return jsonify({
            "success": False,
            "message": "Full name is required"
        }), 400

    if not phone:
        return jsonify({
            "success": False,
            "message": "Phone is required"
        }), 400

    if not role:
        return jsonify({
            "success": False,
            "message": "Role is required"
        }), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id FROM users WHERE email=%s",
        (email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        conn.close()

        return jsonify({
            "success": False,
            "message": "Email already registered"
        }), 409

    sql = """
    INSERT INTO users (full_name, email, phone, password, role)
    VALUES (%s, %s, %s, %s, %s)
    """

    cursor.execute(sql, (
        full_name,
        email,
        phone,
        hashed_password.decode("utf-8"),
        role
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "User Registered Successfully"
    }), 201


# ==========================================================
# LOGIN
# ==========================================================
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request data is required"
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is required"
        }), 400

    if not password:
        return jsonify({
            "success": False,
            "message": "Password is required"
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return jsonify({
            "success": False,
            "message": "Invalid Email or Password"
        }), 401

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):
        return jsonify({
            "success": False,
            "message": "Invalid Email or Password"
        }), 401

    token = jwt.encode(
        {
            "id": user["id"],
            "email": user["email"],
            "role": user["role"],
            "exp": datetime.datetime.utcnow()
            + datetime.timedelta(days=1)
        },
        JWT_SECRET_KEY,
        algorithm="HS256"
    )

    user.pop("password", None)

    return jsonify({
        "success": True,
        "message": "Login Successful",
        "token": token,
        "user": user
    }), 200


# ==========================================================
# PROFILE
# ==========================================================
@token_required()
def profile():

    user_id = request.user["id"]

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT id, full_name, email, phone, role
        FROM users
        WHERE id=%s
        """,
        (user_id,)
    )

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    return jsonify({
        "success": True,
        "user": user
    }), 200


# ==========================================================
# ADMIN DASHBOARD
# ==========================================================
@token_required()
@role_required("admin")
def admin_dashboard():

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM users WHERE role='student'")
    total_students = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM users WHERE role='faculty'")
    total_faculty = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM courses")
    total_courses = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM subjects")
    total_subjects = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "data": {
            "total_students": total_students,
            "total_faculty": total_faculty,
            "total_courses": total_courses,
            "total_subjects": total_subjects
        }
    }), 200