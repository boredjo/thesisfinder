from flask import jsonify
import bcrypt
import mysql.connector
from mysql.connector import errorcode

def get_hashed_password(plain_text_password):
    # Hash a password for the first time
    #   (Using bcrypt, the salt is saved into the hash itself)
    return bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())

class User:
    @classmethod
    def ANON(cls):
        return cls('anonymous', 'Anonymous', 'User', 'US', '', ' ')
    
    def isAnon(self):
        return self.name == 'anonymous'

    def __init__(self, user_name, first_name, last_name, country, email, password_hash = 'default_pass'):
        self.name = user_name
        self.first_name = first_name
        self.last_name = last_name
        self.country = country
        self.email = email
        self.password_hash = password_hash

    def find_user(user_name, cursor):
        try:
            cursor.execute(
                """
                SELECT username, first_name, last_name, country, email, password_hash FROM Users WHERE username = %s ;
                """
                , [user_name]
            )
            row = cursor.fetchone()
        except mysql.connector.Error as err:
            print("MySQL Error: ", err.msg)

        return User(row[0], row[1], row[2], row[3], row[4], row[5])

    def store(self, cursor):
        if self.isAnon() : 
            print("ERROR: tried to save anon account")
        else:
            try:
                cursor.execute(
                    """
                    INSERT INTO Users (username, first_name, last_name, country, email, password_hash) VALUES (%s, %s, %s, %s, %s, %s);
                    """
                    ,[self.name, self.first_name, self.last_name, self.country, self.email, get_hashed_password(self.password_hash).decode('utf-8')]
                )
            except mysql.connector.Error as err:
                if err.errno == errorcode.ER_DUP_ENTRY:
                    return -1
                else:
                    print("MySQL Error: ", err.msg)

    def update(self, new_user, cursor):
            try:
                cursor.execute(
                    """
                    UPDATE Users SET first_name = %s, last_name = %s, country = %s, email = %s, password_hash = %s WHERE username = %s;
                    """
                    ,[new_user.first_name, new_user.last_name, new_user.country, new_user.email, get_hashed_password(new_user.password_hash).decode('utf-8'), self.name]
                )
            except mysql.connector.Error as err:
                print("MySQL Error: ", err.msg)

    def jsonify(self):
        return jsonify({
            'user': self.name,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'country': self.country,
        })

    def nameTaken(self, cursor):
        cursor.execute(
            """
            SELECT username  FROM Users WHERE username = %s OR email = %s;
            """
            , [self.name, self.email]
        )
        return len(cursor.fetchall())  != 0

    def newEmailTaken(self, cursor):
        cursor.execute(
            """
            SELECT username FROM Users WHERE email = %s AND NOT(username = %s);
            """
            , [self.email, self.name]
        )             
        return len(cursor.fetchall())  != 0
    
    def delete(self, cursor):
        cursor.execute(
            """
            DELETE FROM Users WHERE username = %s;
            """
            , [self.name]
        )