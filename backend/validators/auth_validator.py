import re


def validate_email(email):
    if not email:
        return False

    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None


def validate_password(password):
    if not password:
        return False

    if len(password) < 6:
        return False

    return True


def validate_registration_data(data):

    if not data:
        return False, "Request data is required"

    email = data.get("email")
    password = data.get("password")

    if not email:
        return False, "Email is required"

    if not validate_email(email):
        return False, "Invalid email format"

    if not password:
        return False, "Password is required"

    if not validate_password(password):
        return False, "Password must be at least 6 characters"

    return True, None