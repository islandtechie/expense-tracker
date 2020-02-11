import os, datetime
from flask import Flask, render_template, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt import JWT, jwt_required, current_identity
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}/{}".format(os.environ.get('PGUSER'), os.environ.get('PGPASSWORD'), os.environ.get('PGHOST'), os.environ.get('PGDATABASE'))
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
api = Api(app)

app.config['SECRET_KEY'] = 'secret-key'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    registered_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)
    #expenses = db.relationship('Expenses', backref="payer", lazy=True)
    #auth = db.relationship('Expenses', backref="auth", lazy=True)

class Auth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    session = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)

class Register(Resource):
    def post(self):
        user = ''
        if (request.form):
            user = User(
                first_name = request.form['firstname'],
                last_name = request.form['lastname'],
                email = request.form['email'],
                password = generate_password_hash(request.form['password'],method='pbkdf2:sha256', salt_length=10),
                registered_date = datetime.datetime.utcnow(),
                created_at = datetime.datetime.utcnow(),
                modified_at = datetime.datetime.utcnow()
            )
            
            if (user):
                if (user):
                    try:
                        db.session.add(user)
                        db.session.commit()
                        return {'success': 'User created successfully'}, 201
                    except:
                        db.session.rollback()
                        raise

        else:
            return {'error' : 'Please enter your the information entered and try again.'}

class Login(Resource):
    def post(self):
        if (request.form):
            user = User.query.filter_by(email=request.form['email']).first()
            if (user and check_password_hash(user.password, request.form['password'])):
                auth =  Auth(
                    user_id = user.id,
                    session = abs(hash(str(user.id) + str(datetime.datetime.now()))),
                    created_at = datetime.datetime.now(),
                    modified_at = datetime.datetime.now()
                )
                db.session.add(auth)
                db.session.commit()
                return jsonify(
                    id=user.id,
                    firstname=user.first_name,
                    lastname=user.last_name,
                    session=auth.session
                )
            else:
                return 'Please check your credentials or register for an account'

        else:
            return {'error' : 'Please enter your credentials'}

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
