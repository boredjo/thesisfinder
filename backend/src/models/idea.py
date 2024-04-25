from flask import jsonify
from datetime import datetime
import base64

class Idea:

    def __init__(self, title, tags, author, description, id = ''):
        if id == '':
            hash = datetime.now().strftime("%Y%m%d%H%M%S%f").encode('utf-8')
            self.id = base64.b64encode(hash).decode('utf-8')
        else : self.id = id
        self.title = title
        self.tags = tags
        self.author = author
        self.description = description
        self.views = 0
        self.date_posted = str(datetime.now())
        self.claimed_by = []
        self.sponsorships = []
        self.attachments = []

    def store(self, cursor):
        for i in range(5-len(self.tags)):
            self.tags.append(None)
        cursor.execute(
            """
            INSERT INTO Ideas (hash, title, author, description, tag1, tag2, tag3, tag4, tag5) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
            """
            ,[self.id, self.title, self.author, self.description.encode(), self.tags[0], self.tags[1], self.tags[2], self.tags[3], self.tags[4]]
        )

    
    def find_idea(id, cursor):
        cursor.execute(
            """
            SELECT title, author, description, tag1, tag2, tag3, tag4, tag5, views, date_posted FROM Ideas WHERE hash = %s ;
            """
            , [id]
        )
        row = cursor.fetchone()
        tags = list([row[3:7]])
        new_idea = Idea(row[0], tags, row[1], row[2], id=id)
        new_idea.views = int(row[8]) + 1
        new_idea.date_posted = row[9]
        cursor.execute(
            """
            UPDATE Ideas SET views = %s WHERE hash = %s ;
            """
            , [new_idea.views, id]
        )
        return new_idea
    
    def update(self, cursor):
        for i in range(5-len(self.tags)):
            self.tags.append("NULL")
        cursor.execute(
            """
            UPDATE Ideas SET title = %s, description = %s, tag1 = %s, tag2 = %s, tag3 = %s, tag4 = %s, tag5 = %s WHERE hash = %s;
            """
            ,[self.title, self.description.encode(), self.tags[0], self.tags[1], self.tags[2], self.tags[3], self.tags[4], self.id]
        )

    def delete(self, cursor):
        cursor.execute(
            """
            DELETE FROM Ideas WHERE hash = %s;
            """
            , [self.id]
        )

    def jsonify(self):
        return jsonify({
            "id" : self.id,
            "title": self.title,
            "author": self.author,
            "date_posted": self.date_posted,
            "tags": self.tags,
            "description": self.description,
            "attachments": self.attachments,
            "views": self.views,
        })
    def short_jsonify(self):
        return jsonify({
            "id" : self.id,
            "title": self.title,
            "author": self.author,
            "date_posted": self.date_posted,
            "tags": self.tags,
        })
    
    def get_random(n, cursor):
        data = []
        cursor.execute(
            """
            SELECT title, author, tag1, tag2, tag3, tag4, tag5, date_posted, hash FROM Ideas ORDER BY RAND() LIMIT %s ;
            """
            , [n]
        )
        for _ in range(n):
            row = cursor.fetchone()
            tags = list(row[2:7])
            idea = Idea(row[0], tags, row[1], "", id=row[8])
            idea.date_posted = str(row[7])
            data.append(idea)
        return data
    
    def get_serach(n, query, cursor):
        data = []
        cursor.execute(
            """
            SELECT title, author, tag1, tag2, tag3, tag4, tag5, date_posted, hash FROM Ideas LIKE '%' + %s + '%' ORDER BY date_posted DESC LIMIT %s ;
            """
            , [query, n]
        )
        for _ in range(n):
            row = cursor.fetchone()
            tags = list(row[2:7])
            idea = Idea(row[0], tags, row[1], "", id=row[8])
            idea.date_posted = str(row[7])
            data.append(idea)
        return data

