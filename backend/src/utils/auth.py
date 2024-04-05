from werkzeug.wrappers import Response
from mysql.connector import cursor
from flask import  request
import os

from models.user import User
from utils.logs import Logger
from functools import wraps
   
        
def find_user_by_token(cursor:cursor, token:str, logger:Logger):
    try:
        cursor.execute(
            """
            SELECT user FROM AuthTokens 
            WHERE token = %s 
            AND TIMESTAMPDIFF(SECOND, created_date,  UTC_TIMESTAMP()) < %s
            AND valid = 1;
            """
            , [token, os.environ['TOKENLIFESPAN']]
        )
        if cursor.rowcount == 0: return
        else: 
            row = cursor.fetchone()
            return User.find_user(row[0], cursor)
    except Exception as e:
        logger.error(e, 'auth.py - find_user_by_token() - check for valid tokens')
        return

def util_auth():
    def _auth_decorator(f):
        @wraps(f)
        def __auth_decorator(cursor:cursor, *args, **kwargs):
            logger:Logger = request.environ['logger']
            
            if 'Token' in request.headers.keys() and request.headers['Token'] != 'null':
                token = request.headers['Token']

                user = find_user_by_token(cursor, token, logger)
                if user is None:
                    return Response(u'auth fail', mimetype= 'text/plain', status=403)
                else:
                    logger.message('AUTH', user.name)
                    request.environ['user'] = user
                    result = f(cursor, user, *args, **kwargs)

            else: 
                logger.message('AUTH', 'anonymous')
                result = f(cursor, User.ANON(), *args, **kwargs)
                
            return result
        return __auth_decorator
    return _auth_decorator