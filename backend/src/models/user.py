from flask import jsonify
import mysql.connector
from mysql.connector import errorcode

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
                SELECT username, first_name, last_name, country, email, password_hash FROM User WHERE username = %s ;
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
                    INSERT INTO User (username, first_name, last_name, country, email, password_hash) VALUES (%s, %s, %s, %s, %s, %s);
                    """
                    ,[self.name, self.first_name, self.last_name, self.country, self.email, self.password_hash]
                )
            except mysql.connector.Error as err:
                if err.errno == errorcode.ER_DUP_ENTRY:
                    print(-1)
                    return -1
                else:
                    print("MySQL Error: ", err.msg)

    def update(self, new_user, cursor):
            try:
                cursor.execute(
                    """
                    UPDATE User SET first_name = %s, last_name = %s, country = %s, email = %s, password_hash = %s WHERE username = %s;
                    """
                    ,[new_user.first_name, new_user.last_name, new_user.country, new_user.email, new_user.password_hash, self.name]
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
            SELECT username  FROM User WHERE username = %s OR email = %s;
            """
            , [self.name, self.email]
        )
        return len(cursor.fetchall())  != 0

    def newEmailTaken(self, cursor):
        cursor.execute(
            """
            SELECT username FROM User 
            WHERE email = %s
            NOT(username = %s);
            """
            , [self.email, self.name]
        )             
        return len(cursor.fetchall())  != 0