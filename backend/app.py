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
    #expenses = db.relationship('Expenses', backref="payer", lazy=True)
    #auth = db.relationship('Expenses', backref="auth", lazy=True)

class Register(Resource):
    def post(self):
        user = ''
        if (request.form):
            user = User(
                first_name = request.form['firstname'],
                last_name = request.form['lastname'],
                email = request.form['email'],
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
            return {'error' : 'Please enter your credentials and try again.'}
            
api.add_resource(Register, '/register')
