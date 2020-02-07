import os, datetime
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}/{}".format(os.environ.get('PGUSER'), os.environ.get('PGPASSWORD'), os.environ.get('PGHOST'), os.environ.get('PGDATABASE'))
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
api = Api(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    registered_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)
    expenses = db.relationship('Expenses', backref="payer", lazy=True)
    auth = db.relationship('Expenses', backref="auth", lazy=True)

class Expenses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    payee = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)

class Auth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)


class Login(Resource):
    def get(self):
        return 'login'

    def post(self):
        return {'about' : "user post"}

class Register(Resource):
    def post(self):
        if (request.form):
            user = User(
                first_name = request.form.get('firstname'),
                last_name = request.form.get('lastname'),
                email = request.form.get('email'),
                registered_date = datetime.datetime.now(),
                created_at = datetime.datetime.now(),
                modified_at = datetime.datetime.now()
            )

            try:
                db.session.add(user)
                db.session.commit()
                return 'user added', 201
            except:
                db.session.rollback()
                raise

class Logout(Resource):
    def get(self):
        return id

    def post(self):
        return {'about' : "user post"}

class User(Resource):
    def get(self, id):
        return id

    def post(self):
        return {'about' : "user post"}
    
    def hey(self):
        return 'heey there'

class Users(Resource):
    def get(self):
        return 'users'

    def post(self):
        return {'about' : "user post"}

class Expense(Resource):
    def get(self):
        return "Expense Get"

    def post(self):
        if (request.form):
            expense = Expenses(
                date = request.form.get('date'),
                description = request.form.get('description'),
                payee = request.form.get('payee'),
                amount = request.form.get('amount'),
                user_id = request.form.get('userid'),
                created_at = datetime.datetime.now(),
                modified_at = datetime.datetime.now()
            )

            try:
                db.session.add(expense)
                db.session.commit()
                return 'expense added'
            except:
                db.session.rollback()
                raise
        else:
            return {'error': "There was an error. Please try again"}, 500

        #print(request.form.get('date'))
        #return {"Expense Post": "nada"}, 201

api.add_resource(User, '/user', '/user/<int:id>', '/user/hey')
api.add_resource(Users, '/users')
api.add_resource(Expense, '/expense', '/expense/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register')

@app.route("/")
def index():
    return render_template("index.html")