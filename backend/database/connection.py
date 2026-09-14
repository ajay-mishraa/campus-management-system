import mysql.connector
from mysql.connector import Error

from config import (
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
)


# ==========================================================
# MySQL Database Connection
# ==========================================================
def get_db_connection():
    """
    MySQL database connection बनाता है।
    Success होने पर connection object return करेगा।
    Error होने पर None return करेगा।
    """

    try:

        connection = mysql.connector.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,

            # Important
            autocommit=True
        )

        if connection.is_connected():
            print("✅ MySQL Connected Successfully")
            return connection

        return None

    except Error as e:

        print(f"❌ Database Connection Error: {e}")

        return None