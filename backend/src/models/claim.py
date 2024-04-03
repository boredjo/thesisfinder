from flask import jsonify
from datetime import datetime

class Claim:

    def __init__(self, author, idea, date_posted=str(datetime.now())):
        self.idea = idea
        self.author = author
        self.date_posted = date_posted
        self.attachments = []

    def store(self, cursor):
        cursor.execute(
            """
            INSERT INTO Claims (user, idea) VALUES (%s, %s);
            """
            ,[self.author, self.idea]
        )

    
    def find_claims_by_user(author, cursor):
        cursor.execute(
            """
            SELECT user, idea, date_posted FROM Claims WHERE user = %s ;
            """
            , [author]
        )

        rows = cursor.fetchall()
        print(rows)
        claims = []
        for row in rows:
            new_claim = Claim(row[0], row[1], row[2])
            claims.append(new_claim)
        return claims
    
    def find_claims_by_idea(idea, cursor):
        cursor.execute(
            """
            SELECT user, idea, date_posted FROM Claims WHERE idea = %s ;
            """
            , [idea]
        )

        rows = cursor.fetchall()
        claims = []
        for row in rows:
            new_claim = Claim(row[0], row[1], row[2])
            claims.append(new_claim)
        return claims
    

    def delete(self, cursor):
        cursor.execute(
            """
            DELETE FROM Claims WHERE user = %s AND idea = %s;
            """
            , [self.author, self.idea]
        )

    def jsonify(self):
        return jsonify({
            "author": self.author,
            "idea": self.idea,
            "date_posted": self.date_posted,
            "attachments": self.attachments,
        })

