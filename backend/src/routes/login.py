from werkzeug.wrappers import Request, Response, ResponseStream
from flask import Blueprint, request, jsonify
from models.user import User
from datetime import datetime
from utils.db import conn
from utils.logs import log_error
import mysql.connector
from mysql.connector import errorcode

login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/', methods=['GET'])
def get_token():
    print("test")
     # parse incoming data
    try:
        data = request.get_json()
        username = data['user']
        password = data['password']
    except Exception as e:
        log_error(e, "login.py - get_token() - parse data")
        Response(u'Could process the request', mimetype= 'text/plain', status=422)
    
    # get requested user info
    try:
        user = User.find_user(username)
    except Exception as e:
        log_error(e, "login.py - get_token() - find user in DB")
        return Response(u"Couldn't find user", mimetype= 'text/plain', status=422)
    
    if user.password_hash == password:
        token = f'{user.name} {datetime.now().strftime("%m%d%Y%H%M%S%f")}'
        with conn.cursor(buffered=True) as cur:
            try:
                cur.execute(
                    """
                    INSERT INTO AuthTokens (token, user) VALUES (%s, %s);
                    """
                    , [token, user.name]
                )
            except mysql.connector.Error as err:
                    log_error(err, "login.py - get_token() - inserting token into DB")
        return jsonify(
            token = token
        )