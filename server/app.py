import os

from database import db
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

#global variables
currUsers = []
database = db.db()

# instantiate the app, points to the production distribution
app = Flask(__name__, template_folder=os.path.abspath('../client/dist'), static_folder=os.path.abspath('../client/dist/assets'), static_url_path='/assets')
app.config.from_object(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

#Routes
@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/test', methods=['GET'])
def query():
    return jsonify('Working!')

@app.route('/user', methods=['GET'])
def userJoin():
    name = request.args.get("name")
    print(name)
    return jsonify(name)

#Socket.io
@socketio.on('send_message')
def send_message(data):
    database.insert(data)
    print(data)
    emit('send_message', data)

@socketio.on('send_username')
def send_username(user):
    currUsers.append(user)
    print(user)
    emit('send_username', {"username" : user})

# @socketio.on('')

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app)
