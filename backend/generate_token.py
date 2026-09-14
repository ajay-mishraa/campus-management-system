import jwt
import datetime
from config import JWT_SECRET_KEY

token = jwt.encode(
    {
        "id": 2,
        "email": "ajay2@gmail.com",
        "role": "admin",
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    },
    JWT_SECRET_KEY,
    algorithm="HS256"
)

print("\nNEW ADMIN TOKEN:\n")
print(token)