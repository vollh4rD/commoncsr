import motor.motor_asyncio


class Database:

    client = motor.motor_asyncio.AsyncIOMotorClient(
        'mongodb+srv://csr:A9Eq8e8zM0QYTXrL@cluster0.esoof2x.mongodb.net/')
    db = client['csr']
    users = db['users']
    csrs = db['csrs']
