def validate_student_data(data):

    if not data:
        return False, "Request data is required"

    required_fields = [
        "user_id",
        "enrollment_no",
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
            return False, f"{field} is required"

    if not isinstance(data["semester"], int):
        return False, "Semester must be a number"

    if data["semester"] < 1 or data["semester"] > 8:
        return False, "Semester must be between 1 and 8"

    return True, None