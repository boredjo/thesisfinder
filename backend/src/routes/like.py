from werkzeug.wrappers import Response
from flask import Blueprint, request, jsonify
from mysql.connector import cursor

from utils.db import util_db
from utils.auth import util_auth
from utils.parse import parse_json
from utils.logs import Logger
from models.like import Like
from models.user import User


like_blueprint = Blueprint('like', __name__)

@like_blueprint.route('/user/', methods=['GET'])
@util_db()
@util_auth()
def get_user_likes(cursor:cursor, user:User):
    logger:Logger = request.environ['logger']   
    try:
        data = Like.get_user_likes(cursor, user.name)
    except Exception as err:
        logger.error(err, 'routes/like.py - get_user_likes() - find likes')
        data = []

    return jsonify(ideas=[
        {
            "id" : idea.id,
            "title": idea.title,
            "author": idea.author,
            "date_posted": idea.date_posted,
            "tags": idea.tags,
        }
        for idea in data
    ])


@like_blueprint.route('/', methods=['POST'])
@util_db()
@util_auth()
@parse_json(['idea'])
def like_idea(data, cursor:cursor, user:User):
    logger:Logger = request.environ['logger']
    try:
        status = Like.like_idea(cursor, user.name, data['idea'])
    except Exception as err:
        logger.error(err, 'routes/like.py - like_idea() - like idea')
        status = False

    return jsonify(like=status)

@like_blueprint.route('/<path:ideaid>', methods=['GET'])
@util_db()
@util_auth()
def get_like_status(cursor:cursor, user:User, ideaid):
    logger:Logger = request.environ['logger']
    try:
        status = Like.get_status(cursor, user.name, ideaid)
    except Exception as err:
        logger.error(err, 'routes/like.py - get_like_status()) - get status')
        status = False
    return jsonify(like=status)