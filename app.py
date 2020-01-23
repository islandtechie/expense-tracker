102import os
import datetime
from flask import Flask, request, render_template, jsonify, make_response, url_for, redirect
from flask_restful import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__,static_folder='../client/build/static', template_folder='../client/build')

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}/{}".format(os.environ.get('PGUSER'), os.environ.get('PGPASSWORD'), os.environ.get('PGHOST'), os.environ.get('PGDATABASE'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)

class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(255), nullable=False)
    lastname = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    registered = db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    modified = db.Column(db.DateTime, nullable=False)

class UsersSchema(ma.ModelSchema):
    class Meta:
        model = Users

class Expenses(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    expense_date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    purchase_place = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    modified = db.Column(db.DateTime, nullable=False)

class Auth(db.Model):
    __tablename__ = 'auth'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    modified = db.Column(db.DateTime, nullable=False)





class User(Resource):
    def get(self, user_id):
        user = Users.query.filter_by(id=user_id).first()
        users_schema = UsersSchema()
        return users_schema.dump(user)
    
    def post(self):
        return 'gogo'

class Auth(Resource):
    def get(self):
        return 'login form'
    def post(self):
        return 'auth'


        


@app.route('/api/expense', methods=['POST'])
def addExpense():
    data = Expenses(
        user_id = request.form['id'],
        expense_date = request.form['date'],
        description = request.form['description'],
        purchase_place = request.form['payee'],
        amount = request.form['amount'],
        created = datetime.datetime.now(),
        modified = datetime.datetime.now()
    )
    db.session.add(data)
    db.session.commit()
    db.session.refresh(data)
    if (data.id):
        return jsonify({"success": True}), 201
    else:
        return jsonify({"success": False})


def loginUser(username, password):
    print(username)
    print(password)
    user = Users.query.filter_by(email=username).first()
    if (check_password_hash(user.password, password)):
        return 'passed login'
    else:
        return 'failed please check username and/or password'


@app.route('/register', methods=['POST'])
def register():
    data = Users(
        firstname=request.form['firstname'],
        lastname=request.form['lastname'],
        email=request.form['email'],
        registered=datetime.datetime.now(),
        created=datetime.datetime.now(),
        modified=datetime.datetime.now(),
        password=generate_password_hash(request.form['password'])
    )
    db.session.add(data)
    db.session.commit()
    db.session.refresh(data)
    if (data.id):
        return jsonify({"success": True}), 201
    else:
        return jsonify({"success": False})

@app.route('/login', methods=['POST'])
def login():
    return loginUser(request.form['username'], request.form['password'])

@app.route('/logout')
def logout():
    return 'logout'

@app.route("/")
def index():
    return render_template('index.html')