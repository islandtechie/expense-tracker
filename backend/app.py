from flask import Flask, render_template
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class User(Resource):
    def get(self):
        return "User GET"

    def post(self):
        return {'about' : "user post"}

class Expense(Resource):
    def get(self):
        return "Expense Get"

    def post(self):
        return {"Expense Post": "nada"}

api.add_resource(User, '/user')
api.add_resource(Expense, '/expense')

@app.route("/")
def index():
    return render_template("index.html")