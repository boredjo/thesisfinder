from werkzeug.wrappers import Response, Request
import mysql.connector
import sys
import os
import time

from utils.logs import log_error, log_info

def rebase():
    log_info("Rebase set to TRUE", 'db.py')
    try:
        log_info(f"Connecting to MYSQL at {os.environ['DB_USER']}@{os.environ['DB_HOST']}:{os.environ['DB_PORT']}", 'db.py')
        # Connect to MySQL
        connection = mysql.connector.connect(
            user=os.environ['DB_USER'],
            password=os.environ['DB_PASSWORD'],
            host=os.environ['DB_HOST'],
            port=int(os.environ['DB_PORT']),
            database=os.environ['DB_DATABASE'],
            autocommit=True
        )
        log_info(f'Successfully Connected to MYSQL for Rebase', 'db.py')
        
    except mysql.connector.Error as e:
        log_error(e, 'db.py - establish connection')
        sys.exit(1)

    # wipe database
    cursor = connection.cursor(buffered=True)
    with open('sql/delete.sql', 'r') as file:
        log_info(f"Deleting everything", 'db.py')
        ddl_sql = file.read()
    cursor.execute(ddl_sql, multi=True)
    cursor.close()

    # create tables
    sql_files = sorted([f for f in os.listdir('sql/tables/') if f.endswith(".sql")])
    for filename in sql_files:
        connection.reconnect()
        cursor = connection.cursor(buffered=True)
        with open(os.path.join('sql/tables/', filename), 'r') as file:
            log_info(f"Executing {filename}", 'db.py')
            ddl_sql = file.read()
        cursor.execute(ddl_sql)
        cursor.close()
    
    # create trigger
    sql_files = sorted([f for f in os.listdir('sql/trigger/') if f.endswith(".sql")])
    for filename in sql_files:
        connection.reconnect()
        cursor = connection.cursor(buffered=True)
        with open(os.path.join('sql/trigger/', filename), 'r') as file:
            log_info(f"Executing {filename}", 'db.py')
            ddl_sql = file.read()
        cursor.execute(ddl_sql)
        cursor.close()

    # insert data
    sql_files = sorted([f for f in os.listdir('sql/data/') if f.endswith(".sql")])
    for filename in sql_files:
        connection.reconnect()
        cursor = connection.cursor(buffered=True)
        with open(os.path.join('sql/data/', filename), 'r') as file:
            log_info(f"Executing {filename}", 'db.py')
            ddl_sql = file.read()
        cursor.execute(ddl_sql, multi=True)
        cursor.close()


    connection.close()
    log_info("Rebase succesful", 'db.py')

class mysql_middleware():
    def __init__(self, app):
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
