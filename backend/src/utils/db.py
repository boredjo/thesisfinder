import mysql.connector
import sys
import os
from dotenv import dotenv_values

# Load variables from .env file
config = dotenv_values(".env")
# Connect to MariaDB Platform

try:
    # Connect to MySQL
    conn = mysql.connector.connect(
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASSWORD'],
        host=os.environ['DB_HOST'],
        port=int(os.environ['DB_PORT']),
        database=os.environ['DB_DATABASE'],
        autocommit=True
    )
    print('connected')

    # If the connection is successful, proceed with further operations
    
except mysql.connector.Error as e:
    print(f"Error connecting to MySQL: {e}")
    sys.exit(1)


# # Get Cursor
# cur = conn.cursor(buffered=True)