 
from werkzeug.wrappers import Request, Response, ResponseStream
from models.user import User
from utils.db import conn
import mysql.connector
from mysql.connector import errorcode

TOKENLIFSPAN = 300

class auth_middleware():
    '''
    Simple auth WSGI middleware
    https://medium.com/swlh/creating-middlewares-with-python-flask-166bd03f2fd4
    '''

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        request = Request(environ)
        try:
            token = request.headers['token']
        except:
            environ['user'] = User.ANON()
            return self.app(environ, start_response)
        
        try:
            with conn.cursor(buffered=True) as cur:
                cur.execute(
                    """
                    SELECT user FROM AuthTokens WHERE token = %s AND TIMESTAMPDIFF(SECOND, created_date,  UTC_TIMESTAMP()) < %s;
                    """
                    , [token, TOKENLIFSPAN]
                )
                row = cur.fetchone()
            environ['user'] = User.find_user(row[0])
            return self.app(environ, start_response)
        except mysql.connector.Error as err:
            print("MySQL Error: ", err.msg)
            res = Response(u'Authorization failed', mimetype= 'text/plain', status=401)
            return res(environ, start_response)
        
        except TypeError:
            res = Response(u'Authorization failed', mimetype= 'text/plain', status=401)
            return res(environ, start_response)
        

            
        
        