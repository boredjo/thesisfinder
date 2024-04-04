from werkzeug.wrappers import Request, Response
import mysql.connector
import os
from mysql.connector import cursor
from models.user import User
from utils.logs import Logger
from functools import wraps
from flask import  request



# class auth_middleware():
#     '''
#     Simple auth WSGI middleware
#     https://medium.com/swlh/creating-middlewares-with-python-flask-166bd03f2fd4
#     '''

#     def __init__(self, app):
#         self.app = app

#     def __call__(self, environ, start_response):
#         request = Request(environ)
#         if request.path.startswith("/doc"): # pass trough for the documentation
#             return self.app(environ, start_response)

#         if 'Token' in request.headers.keys() and request.headers['Token'] != 'null':
#             token = request.headers['Token']
#             try:
#                 environ['cursor'].execute(
#                     """
#                     SELECT user FROM AuthTokens 
#                     WHERE token = %s 
#                     AND TIMESTAMPDIFF(SECOND, created_date,  UTC_TIMESTAMP()) < %s
#                     AND valid = 1;
#                     """
#                     , [token, os.environ['TOKENLIFESPAN']]
#                 )
#                 if environ['cursor'].rowcount == 0:
#                     environ['logger'].message('AUTH-FAIL', 'no valid token in DB')
#                     res = Response(u'Authorization failed', mimetype= 'text/plain', status=403)
#                     return res(environ, start_response)
#                 else:
#                     row = environ['cursor'].fetchone()
#                     environ['user'] = User.find_user(row[0], environ['cursor'])
#                     environ['logger'].message('AUTH', environ['user'].name)
#                     return self.app(environ, start_response)
#             except mysql.connector.Error as e:
#                 environ['logger'].error(e, 'auth.py - check for valid tokens')
#                 res = Response(u'Authorization failed', mimetype= 'text/plain', status=403)
#                 return res(environ, start_response)

#         else: 
#             environ['user'] = User.ANON()
#             environ['logger'].message('AUTH', 'anonymous')
#             return self.app(environ, start_response)     
        
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
    except mysql.connector.Error as e:
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
                    return Response(u'Authorization failed', mimetype= 'text/plain', status=403)
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