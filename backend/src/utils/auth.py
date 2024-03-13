from werkzeug.wrappers import Request, Response
import mysql.connector
import os

from models.user import User



class auth_middleware():
    '''
    Simple auth WSGI middleware
    https://medium.com/swlh/creating-middlewares-with-python-flask-166bd03f2fd4
    '''

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        request = Request(environ)
        if 'Token' in request.headers.keys():
            token = request.headers['Token']
            try:
                environ['cursor'].execute(
                    """
                    SELECT user FROM AuthTokens 
                    WHERE token = %s 
                    AND TIMESTAMPDIFF(SECOND, created_date,  UTC_TIMESTAMP()) < %s
                    AND valid = 1;
                    """
                    , [token, os.environ['TOKENLIFSPAN']]
                )
                if environ['cursor'].rowcount == 0:
                    environ['logger'].message('AUTH-FAIL', 'no valid token in DB')
                    res = Response(u'Authorization failed', mimetype= 'text/plain', status=4)
                    return res(environ, start_response)
                else:
                    row = environ['cursor'].fetchone()
                    environ['user'] = User.find_user(row[0], environ['cursor'])
                    environ['logger'].message('AUTH', environ['user'].name)
                    return self.app(environ, start_response)
            except mysql.connector.Error as e:
                environ['logger'].error(e, 'auth.py - check for valid tokens')
                res = Response(u'Authorization failed', mimetype= 'text/plain', status=4)
                return res(environ, start_response)

        else: 
            environ['user'] = User.ANON()
            environ['logger'].message('AUTH', 'anonymous')
            return self.app(environ, start_response)

            
        
        