from flask import jsonify
from datetime import datetime, timedelta
import base64

class Sponsor:
    def __init__(self, id, author, idea, amount, description, date_posted=str(datetime.now()), deadline=str(datetime.now()+timedelta(30))):
        if id == '':
            hash = datetime.now().strftime("%s%m%Y%H%M%S%f").encode('utf-8')
            self.id = base64.b64encode(hash).decode('utf-8')
            print(self.id)
        else : self.id = id
        self.idea = idea
        self.author = author
        self.description = description
        self.date_posted = date_posted
        self.deadline = deadline
        self.amount = amount
        self.attachments = []
        self.views = 0

    def store(self, cursor):
        print(self.id)
        cursor.execute(
            """
            INSERT INTO Sponsors (id, author, idea, amount, description, deadline) VALUES (%s, %s, %s, %s, %s, %s);
            """
            ,[self.id, self.author, self.idea, self.amount, self.description, self.deadline]
        )

    
    def find_sponsor_by_user(author, cursor):
        cursor.execute(
            """
            SELECT id, author, idea, amount, date_posted, deadline FROM Sponsors WHERE author = %s ;
            """
            , [author]
        )

        rows = cursor.fetchall()
        print(rows)
        sponsors = []
        for row in rows:
            new_sponsor = Sponsor(row[0], row[1], row[2], row[3], "", date_posted=row[4], deadline=row[5])
            sponsors.append(new_sponsor)
        return sponsors
    
    def find_sponsor_by_idea(idea, cursor):
        cursor.execute(
            """
            SELECT id, author, idea, amount, date_posted, deadline FROM Sponsors WHERE idea = %s ;
            """
            , [idea]
        )

        rows = cursor.fetchall()
        print(rows)
        sponsors = []
        for row in rows:
            new_sponsor = Sponsor(row[0], row[1], row[2], row[3], "", date_posted=row[4], deadline=row[5])
            sponsors.append(new_sponsor)
        return sponsors
    

    def delete(self, cursor):
        cursor.execute(
            """
            DELETE FROM Sponsors WHERE id = %s;
            """
            , [self.id]
        )

    def get_sponsorship(id, cursor):
        cursor.execute(
            """
            SELECT id, author, idea, amount, description, date_posted, deadline, views FROM Sponsors WHERE id = %s ;
            """
            , [id]
        )

        row = cursor.fetchone()
        sponsor = Sponsor(row[0], row[1], row[2], row[3], row[4], date_posted=row[5], deadline=row[6])
        sponsor.views = row[7]
        return sponsor

    def jsonify(self):
        return jsonify({
            "id" : self.id,
            "idea": self.idea,
            "author": self.author,
            "date_posted": self.date_posted,
            "deadline": self.deadline,
            "description": self.description,
            "attachments": self.attachments,
            "views": self.views,
            "amount": self.amount,
        })

