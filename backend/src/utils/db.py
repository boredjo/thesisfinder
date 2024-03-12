import mysql.connector
import sys
from dotenv import dotenv_values

# Load variables from .env file
config = dotenv_values(".env")
print('read .env')
print(config)
# Connect to MariaDB Platform

conn = mysql.connector.connect(
    user=config['DB_USER'],
    password=config['DB_PASSWORD'],
    host='192.168.100.39',
    port=3306,
    database=config['DB_DATABASE']
)
print('connected')


# Get Cursor
cur = conn.cursor()
cur.execute(
    "SELECT * FROM AuthToken")