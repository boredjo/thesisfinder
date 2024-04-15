from flask import jsonify

from models.idea import Idea

class Like:

    def get_status(cursor, user:str, idea:str):
        cursor.execute(
            """
            SELECT get_likes_function(%s, %s);
            """
            , [user, idea]
        )
        row = cursor.fetchone()
        return row[0] == 1

    def like_idea(cursor, user:str, idea:str):
        cursor.execute(
            """
            SELECT update_like_function(%s, %s);
            """
            , [user, idea]
        )
        row = cursor.fetchone()
        return row[0] == 1

    def get_user_likes(cursor, user:str):
        data = []
        cursor.execute(
            """
            SELECT Ideas.title, Ideas.author, Ideas.tag1, Ideas.tag2, Ideas.tag3, Ideas.tag4, Ideas.tag5, Ideas.date_posted, Ideas.hash 
            FROM Likes INNER JOIN Ideas  ON Ideas.hash = Likes.idea
            WHERE Likes.user = %s;
            """
            , [user]
        )
        rows = cursor.fetchall()
        for row in rows:
            tags = list(row[2:7])
            idea = Idea(row[0], tags, row[1], "", id=row[8])
            idea.date_posted = str(row[7])
            data.append(idea)
        return data