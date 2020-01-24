import flask

app = flask.Flask("__main__")

@app.route('/')
def index():
    return 'hello world'


app.run(debug=True)