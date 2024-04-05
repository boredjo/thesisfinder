from werkzeug.wrappers import Request, Response, ResponseStream
from flask import Blueprint, request, jsonify
from datetime import datetime
import mysql.connector
from mysql.connector import errorcode
from mysql.connector import cursor
import hashlib
import bcrypt

from utils.db import util_db
from utils.parse import parse_json
from utils.logs import Logger
from models.user import User
from utils.logs import log_error

def check_password(plain_text_password, hashed_password):
    # Check hashed password. Using bcrypt, the salt is saved into the hash itself
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_password.encode('utf-8'))


login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/', methods=['POST'])
@util_db()
@parse_json(['user', 'password'])
def get_token(data, cursor:cursor ):
    logger:Logger = request.environ['logger']
    
    # get requested user info
    try:
        user = User.find_user(data['user'], cursor)
    except Exception as e:
        logger.error(e, "login.py - get_token() - find user in DB")
        return Response(u"no user", mimetype= 'text/plain', status=422)
    
    if check_password(data['password'], user.password_hash):
        token = f'{user.name} {datetime.now().strftime("%m%d%Y%H%M%S%f")}'
        token = hashlib.md5(token.encode()).hexdigest()
        try:
            cursor.execute(
                """
                INSERT INTO AuthTokens (token, user) VALUES (%s, %s);
                """
                , [token, user.name]
            )
        except mysql.connector.Error as err:
                logger.error(err, "login.py - get_token() - inserting token into DB")
        logger.message('CREATED TOKEN', token)
        return jsonify(token = token)
    else:
        return Response(u'auth fail', mimetype= 'text/plain', status=403)