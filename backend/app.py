from flask import Flask, render_template

app = Flask("__main__")

@app.route("/")
def index():
    return 'Hello world'

