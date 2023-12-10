from flask import Flask, jsonify
from flask_cors import CORS


# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# sanity check route
@app.route('/test', methods=['GET'])
def ping_pong():
    return jsonify('Working!')


if __name__ == '__main__':
    app.run()