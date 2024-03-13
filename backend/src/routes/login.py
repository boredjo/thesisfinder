from werkzeug.wrappers import Request, Response, ResponseStream
from flask import Blueprint, request, jsonify
from datetime import datetime
import mysql.connector
from mysql.connector import errorcode
import hashlib

from models.user import User
from utils.logs import log_error

login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/', methods=['GET'])
def get_token():
    data = request.environ['parsed_data']
    if 'user' in data.keys() and 'password' in data.keys():
        username = data['user']
        password = data['password']
    else: 
        request.environ['logger'].message('WRONG JSON')
        return Response(u"json fromat has wrong keys", mimetype= 'text/plain', status=422)
    
    # get requested user info
    try:
        user = User.find_user(username, request.environ['cursor'])
    except Exception as e:
        request.environ['logger'].error(e, "login.py - get_token() - find user in DB")
        return Response(u"Couldn't find user", mimetype= 'text/plain', status=422)
    
    if user.password_hash == password:
        token = f'{user.name} {datetime.now().strftime("%m%d%Y%H%M%S%f")}'
        token = hashlib.md5(token.encode()).hexdigest()
        try:
            request.environ['cursor'].execute(
                """
                INSERT INTO AuthTokens (token, user) VALUES (%s, %s);
                """
                , [token, user.name]
            )
        except mysql.connector.Error as err:
                request.environ['logger'].error(err, "login.py - get_token() - inserting token into DB")
        request.environ['logger'].message('CREATED TOKEN', token)
        return jsonify(
            token = token
        )