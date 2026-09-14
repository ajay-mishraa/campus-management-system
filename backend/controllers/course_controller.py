from flask import request

from database.connection import get_db_connection


# ==========================================================
# Get All Courses
# ==========================================================
def get_all_courses():

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            c.id,
            c.course_code,
            c.course_name,
            c.department,
            c.semester,
            c.credits,
            c.faculty_id,
            c.description,
            c.is_active
        FROM courses c
        ORDER BY c.id
    """)

    courses = cursor.fetchall()

    cursor.close()
    connection.close()

    return {
        "courses": courses,
        "success": True
    }


# ==========================================================
# Add Course
# ==========================================================
def add_course():

    data = request.get_json()

    course_code = data.get("course_code")
    course_name = data.get("course_name")
    department = data.get("department")
    semester = data.get("semester")
    credits = data.get("credits", 0)
    faculty_id = data.get("faculty_id")
    description = data.get("description")

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO courses
        (
            course_code,
            course_name,
            department,
            semester,
            credits,
            faculty_id,
            description
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        course_code,
        course_name,
        department,
        semester,
        credits,
        faculty_id,
        description
    ))

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Course Added Successfully",
        "success": True
    }, 201


# ==========================================================
# Update Course
# ==========================================================
def update_course(id):

    data = request.get_json()

    course_code = data.get("course_code")
    course_name = data.get("course_name")
    department = data.get("department")
    semester = data.get("semester")
    credits = data.get("credits", 0)
    faculty_id = data.get("faculty_id")
    description = data.get("description")

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        UPDATE courses
        SET
            course_code = %s,
            course_name = %s,
            department = %s,
            semester = %s,
            credits = %s,
            faculty_id = %s,
            description = %s
        WHERE id = %s
    """, (
        course_code,
        course_name,
        department,
        semester,
        credits,
        faculty_id,
        description,
        id
    ))

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Course Updated Successfully",
        "success": True
    }


# ==========================================================
# Delete Course
# ==========================================================
def delete_course(id):

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        DELETE FROM courses
        WHERE id = %s
    """, (id,))

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Course Deleted Successfully",
        "success": True
    }