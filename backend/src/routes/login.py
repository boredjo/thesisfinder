from werkzeug.wrappers import Request, Response, ResponseStream
from flask import Blueprint, request, jsonify
from models.user import User
from datetime import datetime
from utils.db import conn
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
        print(e)
        Response(u'Could process the request', mimetype= 'text/plain', status=422)
    
    # get requested user info
    try:
        user = User.find_user(username)
    except:
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
                    if err.errno == errorcode.ER_DUP_ENTRY:
                        print(-1)
                        return -1
                    else:
                        print("MySQL Error: ", err.msg)
        return jsonify(
            token = token
        )