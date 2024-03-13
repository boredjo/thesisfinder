from werkzeug.wrappers import Response, Request
from dotenv import load_dotenv
import mysql.connector
import sys
import os

from utils.logs import log_error, log_info

class mysql_middleware():
    def __init__(self, app):
        load_dotenv(".env")
        try:
            log_info(f"Connecting to MYSQL at {os.environ['DB_USER']}@{os.environ['DB_HOST']}:{os.environ['DB_PORT']}", 'db.py')
            # Connect to MySQL
            self.connection = mysql.connector.connect(
                user=os.environ['DB_USER'],
                password=os.environ['DB_PASSWORD'],
                host=os.environ['DB_HOST'],
                port=int(os.environ['DB_PORT']),
                database=os.environ['DB_DATABASE'],
                autocommit=True
            )
            log_info(f'Successfully Connected to MYSQL', 'db.py')
            
        except mysql.connector.Error as e:
            log_error(e, 'db.py - establish connection')
            sys.exit(1)
        self.app = app

    def __call__(self, environ, start_response):
        request = Request(environ)
        if request.path.startswith("/doc"): # pass trough for the documentation
            return self.app(environ, start_response)

        if not self.connection.is_connected():
            environ['logger'].info('Reconecting to DB', 'db.py')
            self.connection.reconnect(3)
        
        if not self.connection.is_connected():
            environ['logger'].error('Cannot connect to DB', 'db.py')
            res = Response(u'Internal Server Error', mimetype= 'text/plain', status=500)
            return res(environ, start_response)

        environ['cursor'] = self.connection.cursor(buffered=True)
        environ['logger'].message('MYSQL', 'attached cursor')
        return self.app(environ, start_response)
