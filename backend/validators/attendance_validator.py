def validate_attendance_data(data):

    if not data:
        return False, "Request data is required"

    required_fields = [
        "student_id",
        "subject_id",
        "attendance_date",
        "status"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            return False, f"{field} is required"

    allowed_status = ["Present", "Absent", "Leave"]

    if data["status"] not in allowed_status:
        return False, "Status must be Present, Absent or Leave"

    return True, None