import os, datetime, json
from flask import Flask, render_template, request, jsonify, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='build', template_folder='build')
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}/{}".format(os.environ.get('PGUSER'), os.environ.get('PGPASSWORD'), os.environ.get('PGHOST'), os.environ.get('PGDATABASE'))
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
api = Api(app)

app.config['SECRET_KEY'] = 'secret-key'

class User(db.Model):
    __tablename__ = "user"

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

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = generate_password_hash(password ,method='pbkdf2:sha256', salt_length=10)
        self.registered_date = datetime.datetime.now()
        self.created_at = datetime.datetime.now()
        self.modified_at = datetime.datetime.now()

    def encode_auth_token(self):
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
                'iat': datetime.datetime.utcnow(),
                'sub': self.id
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

class Auth(db.Model):
    __tablename__ = "auth"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    session = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, token):
        self.user_id = user_id
        self.session = token
        self.created_at = datetime.datetime.now()
        self.modified_at = datetime.datetime.now()

class Register(Resource):
    def post(self):
        data = request.json
        print(data['email'])
        user = User.query.filter_by(email=data['email']).first()
        print(user)
        if user is not None:
            return {'error' : 'User already exists. Please login.'}
        else:
            user = User(
                first_name = data['firstName'],
                last_name = data['lastName'],
                email = data['email'],
                password =data['password']
            )
            try:
                db.session.add(user)
                db.session.commit()
                print(user.id)
                return {
                    'success': 'User created successfully',
                    'user_id' : user.id
                    }, 201
            except:
                db.session.rollback()
                raise

class Login(Resource):
    def post(self):
        data = request.json
        if data == {}: return {'error' : 'Please fill in credentials and Try again.'}
        if not data['email'] == '' and not data['password'] == '':
            user = User.query.filter_by(email=data['email']).first()
            print(user)
            if (user != None and check_password_hash(user.password, data['password'])):
                print('I GET HERE')
                auth =  Auth(
                    user_id = user.id,
                    token = user.encode_auth_token().decode()
                )

                db.session.add(auth)
                db.session.commit()

                return {
                    'session_id' : auth.session,
                    'auth_id' : auth.id,
                    'user' : {
                        'id' : user.id,
                        'fname' : user.first_name,
                        'lname' : user.last_name,
                        'email' : user.email,
                        'registered_date' : str(user.registered_date)
                    }
                }
            else:
                return {'error' : 'Please check your credentials or register for an account'}, 401

        else:
            return {'error' : 'Please enter your credentials'}
    
    

class Logout(Resource):
    def post(self):
        data = request.json
        print(request.json)
        return {'success' : 'almost logged out'}


api.add_resource(Register, '/api/register')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/logout')

def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


@app.route('/')
def index():
    return render_template('index.html')