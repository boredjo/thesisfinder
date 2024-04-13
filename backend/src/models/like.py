from flask import jsonify

class Like:

    def get_status(cursor, user, idea):
        return False

    def like_idea(cursor, user, idea):
        return Like.get_status(cursor, user, idea)

    def get_user_likes(cursor, user, idea):
        return []