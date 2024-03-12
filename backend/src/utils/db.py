import mysql.connector
import sys
import os
from dotenv import load_dotenv
from utils.logs import log_error, log_info

# Load variables from .env file
load_dotenv(".env")
# Connect to MariaDB Platform

try:
    log_info(f"Connecting to MYSQL at {os.environ['DB_USER']}@{os.environ['DB_HOST']}:{os.environ['DB_PORT']}", 'db.py')
    # Connect to MySQL
    conn = mysql.connector.connect(
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASSWORD'],
        host=os.environ['DB_HOST'],
        port=int(os.environ['DB_PORT']),
        database=os.environ['DB_DATABASE'],
        autocommit=True
    )
    log_info(f'Successfully Connected to MYSQL', 'db.py')


    # If the connection is successful, proceed with further operations
    
except mysql.connector.Error as e:
    log_error(e, 'db.py - establish connection')
    sys.exit(1)


# # Get Cursor
# cur = conn.cursor(buffered=True)