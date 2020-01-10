import os
import datetime
from flask import Flask, request, render_template
from flask_restful import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='../client/build/static', template_folder='../client/build')

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}/{}".format(os.environ.get('PGUSER'), os.environ.get('PGPASSWORD'), os.environ.get('PGHOST'), os.environ.get('PGDATABASE'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
api = Api(app)

class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(255), nullable=False)
    lastname = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    registered = db.Column(db.DateTime, nullable=False)

class Expenses(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True)
    expense_date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    purchase_place = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    modified = db.Column(db.DateTime, nullable=False)

class Auth(db.Model):
    __tablename__ = 'auth'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    modified = db.Column(db.DateTime, nullable=False)





class User(Resource):
    def get(self):
        return 'some'
    
    def post(self):
        return 'gogo'

class Auth(Resource):
    def post(self):
        return 'auth'

class Register(Resource):
    def post(self):
        data = Users(
            firstname=request.form['firstname'],
            lastname=request.form['lastname'],
            email=request.form['email'],
            registered=datetime.datetime.now()
        )
        print(request.form['firstname'])
        db.session.add(data)
        db.session.commit()
        return 'register'

api.add_resource(User, '/user/:id')
api.add_resource(Auth, '/auth')
api.add_resource(Register, '/register')


@app.route('/login')
def login():
    return 'login'

@app.route('/logout')
def logout():
    return 'logout'

@app.route("/")
def index():
    return render_template('index.html')