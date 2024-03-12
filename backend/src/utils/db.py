import mysql.connector
import sys
from dotenv import dotenv_values

# Load variables from .env file
config = dotenv_values(".env")
# Connect to MariaDB Platform

try:
    # Connect to MySQL
    conn = mysql.connector.connect(
        user=config['DB_USER'],
        password=config['DB_PASSWORD'],
        host=config['DB_HOST'],
        port=int(config['DB_PORT']),
        database=config['DB_DATABASE'],
        autocommit=True
    )
    print('connected')

    # If the connection is successful, proceed with further operations
    
except mysql.connector.Error as e:
    print(f"Error connecting to MySQL: {e}")
    sys.exit(1)


# # Get Cursor
# cur = conn.cursor(buffered=True)