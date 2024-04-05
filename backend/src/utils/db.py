from werkzeug.wrappers import Response
from flask import  request
from functools import wraps
import mysql.connector
import sys
import os


from utils.logs import Logger, log_error, log_info

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
    log_info(f'Successfully Connected to MYSQL', 'db.py')
    
except mysql.connector.Error as e:
    log_error(e, 'db.py - establish connection')
    sys.exit(1)
    

def rebase():
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


def util_db():
    def _db_decorator(f):
        @wraps(f)
        def __db_decorator(*args, **kwargs):
            logger:Logger = request.environ['logger']

            try:
                if not connection.is_connected():
                    logger.info('Reconecting to DB', 'db.py')
                    connection.reconnect(3)
            
                cursor = connection.cursor(buffered=True)
            except Exception as e:
                logger.error(e, 'db.py - util_db - generating cursor')
                return Response(u'auth fail', mimetype= 'text/plain', status=500)
            logger.message('MYSQL', 'created cursor')

            result = f(cursor, *args, **kwargs)
            cursor.close()
            return result
        return __db_decorator
    return _db_decorator
