from werkzeug.wrappers import Request, Response, ResponseStream
from flask import Blueprint, request, jsonify
from datetime import datetime
import mysql.connector
from mysql.connector import errorcode
import hashlib
import bcrypt

from models.user import User
from utils.logs import log_error

def check_password(plain_text_password, hashed_password):
    # Check hashed password. Using bcrypt, the salt is saved into the hash itself
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_password.encode('utf-8'))


login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/', methods=['POST'])
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
    
    if check_password(password, user.password_hash):
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
        return jsonify(token = token)
    else:
        return Response(u'Authorization failed', mimetype= 'text/plain', status=403)