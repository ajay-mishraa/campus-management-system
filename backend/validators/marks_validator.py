def validate_marks_data(data):

    if not data:
        return False, "Request data is required"

    required_fields = [
        "student_id",
        "subject_id",
        "exam_type",
        "marks"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            return False, f"{field} is required"

    marks = data["marks"]
    max_marks = data.get("max_marks", 100)

    if not isinstance(marks, (int, float)):
        return False, "Marks must be a number"

    if not isinstance(max_marks, (int, float)):
        return False, "Maximum marks must be a number"

    if marks < 0:
        return False, "Marks cannot be negative"

    if marks > max_marks:
        return False, "Marks cannot be greater than maximum marks"

    if max_marks <= 0:
        return False, "Maximum marks must be greater than 0"

    return True, None