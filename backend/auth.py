import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta

import database

db = database.Database()
users = db.users

security = HTTPBearer()
pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")
secret = 'password555'


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain, hash):
    return pwd_context.verify(plain, hash)


def encode_token(user_id):
    payload = {
        'exp': datetime.utcnow() + timedelta(days=15, minutes=0),
        'iat': datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(
        payload,
        secret,
        algorithm='HS256'
    )


def decode_token(token):
    try:
        payload = jwt.decode(token, secret, algorithms='HS256')
        return payload['sub']
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token Expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid Token')


async def auth_wrapper(auth: HTTPAuthorizationCredentials = Security(security)):
    x = decode_token(auth.credentials)
    user = await users.find_one({'email': x})
    if not user:
        raise HTTPException(
            status_code=401, detail="Not authenticated")

    return user


async def material_auth_wrapper(auth: HTTPAuthorizationCredentials = Security(security)):
    x = decode_token(auth.credentials)
    user = await users.find_one({'email': x})
    if not user:
        raise HTTPException(
            status_code=401, detail="Not authenticated")

    if type:
        if 'material' != user['type']:
            raise HTTPException(
                status_code=401, detail="Invalid Token")

    return user
