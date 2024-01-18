import uvicorn
import random
from fastapi import FastAPI, Depends, HTTPException, Request, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

import auth
from database import Database

app = FastAPI(debug=True,)
origins = [

    "http://localhost",
    "http://localhost:5173",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = Database()
users = db.users
csrs = db.csrs


class Register(BaseModel):
    name: str
    email: str
    password: str
    website: str
    image: bytes = None


class Login(BaseModel):
    email: str
    password: str


class CsrDetails(BaseModel):
    title: str
    description: str
    image: bytes = None


class addCsr(BaseModel):
    id: str


@app.post('/register')
async def register(data: Register):
    user = await users.find_one({'email': data.email})

    if user:
        raise HTTPException(status_code=401, detail="Account already exists")

    await users.insert_one({
        "email": data.email,
        "name": data.name,
        "password": auth.get_password_hash(data.password),
        "website": data.website,
        "image": data.image
    })
    return {"token": auth.encode_token(data.email)}


@app.post('/login')
async def login(data: Login):
    user = await users.find_one({'email': data.email})

    if not user:
        raise HTTPException(
            status_code=401, detail="Invalid Username or password")

    if not auth.verify_password(data.password, user['password']):

        raise HTTPException(
            status_code=401, detail="Invalid Username or password")

    return {"token": auth.encode_token(data.email)}


@app.post('/create_csr')
async def create_csr(data: CsrDetails, user=Depends(auth.auth_wrapper)):
    await csrs.insert_one({
        "title": data.title,
        "description": data.description,
        "image": data.image,
        "created_by": user['email'],
        "joining": [],
        "pk": random.randint(1, 10000)
    })

    return {"message": "Success"}


@app.get('/get_csrs')
async def get_csrs(user=Depends(auth.auth_wrapper)):
    data = []
    docs = csrs.find({}, {"_id": 0})

    async for doc in docs:
        data.append(doc)

    return {"csrs": data}


@app.post('/add_csr')
async def add_csr(id: addCsr, user=Depends(auth.auth_wrapper)):
    csr = await csrs.find_one({'pk': int(id.id)}, {"_id": 0})
    if user['email'] not in csr['joining']:
        await csrs.find_one_and_update({'pk': int(id.id)}, {
            "$push": {
                "joining": user['email']
            }
        })
    return {"message": "Success"}


@app.get('/get_csr/{csr_id}')
async def get_csr(csr_id, user=Depends(auth.auth_wrapper)):

    join = []
    csr_details = await csrs.find_one({'pk': int(csr_id)}, {"_id": 0})

    joining = users.find({"email": {"$in": csr_details['joining']}}, {
                         "_id": 0, "password": 0})
    created = await users.find_one({"email": csr_details['created_by']}, {"_id": 0, "password": 0})

    if joining:
        async for doc in joining:
            join.append(doc)

    return {"csr": csr_details, "joining": join, "created": created}


@app.get('/companies')
async def companies():
    comps = []

    companies = users.find({}, {"_id": 0, "password": 0})

    async for c in companies:
        comps.append(c)

    return {"companies": comps}
