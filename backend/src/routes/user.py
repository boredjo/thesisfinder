from werkzeug.wrappers import Response
from flask import Blueprint, request
from mysql.connector import cursor

from utils.db import util_db
from utils.auth import util_auth
from utils.logs import Logger
from utils.parse import parse_json
from models.user import User
from routes.profilepicture import delete_picture

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/', methods=['GET'])
@util_db()
@util_auth()
def get_user(cursor:cursor, user:User):
    return user.jsonify()

@user_blueprint.route('/', methods=['POST'])
@util_db()
@util_auth()
@parse_json(['user', 'first_name', 'last_name', 'country', 'email', 'password'])
def post_user(data, cursor:cursor, user:User):
    logger:Logger = request.environ['logger']

    new_user = User(data['user'], data['first_name'], data['last_name'], data['country'], data['email'], data['password'])
    
    # update database
    if user.name == new_user.name: # updateing user info
        if new_user.newEmailTaken(cursor):
            logger.message("POST_USER", f'{new_user.email} is already taken')
            return Response(u'not unique', mimetype= 'text/plain', status=422)
        user.update(new_user, cursor)
        logger.message("POST_USER", f'{new_user.name} updated')
        return Response(u'updating user info', mimetype= 'text/plain', status=200)
    
    elif user.isAnon(): # create new user
        if new_user.nameTaken(cursor):
            logger.message("POST_USER", f'{new_user.name} or {new_user.email} is already taken')
            return Response(u'not unique', mimetype= 'text/plain', status=422)
        new_user.store(cursor)
        logger.message("POST_USER", f'{new_user.name} created')
        return Response(u'created new user', mimetype= 'text/plain', status=200)
    else:
        logger.message("POST_USER", 'auth fail')
        return Response(u'no auth', mimetype= 'text/plain', status=401)
    
@user_blueprint.route('/', methods=['DELETE'])
@util_db()
@util_auth()
def delete_user(cursor:cursor, user:User):
    logger:Logger = request.environ['logger']

    if user.isAnon():
        logger.message("DELETE_USER", 'auth fail')
        return Response(u'no auth', mimetype= 'text/plain', status=401) 

    user.delete(cursor)
    try:
        delete_picture(user.name)
    except FileNotFoundError:
        pass
    logger.message("DELTE_USER", f'deleted user {user.name}')
    return Response(u'Deleted user', mimetype= 'text/plain', status=200)