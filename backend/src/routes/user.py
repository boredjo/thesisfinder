from werkzeug.wrappers import Request, Response, ResponseStream
from flask import Blueprint, request

from models.user import User
from routes.profilepicture import delete_picture

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/', methods=['GET'])
def get_user():
    user = request.environ['user']
    return user.jsonify()

@user_blueprint.route('/', methods=['POST'])
def post_user():
    user = request.environ['user'] # get issuing user

    # parse incoming data
    try:
        data = request.environ['parsed_data']
        new_user = User(data['user'], data['first_name'], data['last_name'], data['country'], data['email'], data['password'])
    except Exception as e:
        request.environ['logger'].error(e, 'routes/user.py - post_user() - parse new user data')
        return Response(u'Could process the request', mimetype= 'text/plain', status=422)
    
    # update database
    if user.name == new_user.name: # updateing user info
        if new_user.newEmailTaken(request.environ['cursor']):
            request.environ['logger'].message("POST_USER", f'{new_user.email} is already taken')
            return Response(u'Username or Email is already taken', mimetype= 'text/plain', status=422)
        user.update(new_user, request.environ['cursor'])
        request.environ['logger'].message("POST_USER", f'{new_user.name} updated')
        return Response(u'updating user info', mimetype= 'text/plain', status=200)
    
    elif user.isAnon(): # create new user
        if new_user.nameTaken(request.environ['cursor']):
            request.environ['logger'].message("POST_USER", f'{new_user.name} or {new_user.email} is already taken')
            return Response(u'Username or Email is already taken', mimetype= 'text/plain', status=422)
        new_user.store(request.environ['cursor'])
        request.environ['logger'].message("POST_USER", f'{new_user.name} created')
        return Response(u'created new user', mimetype= 'text/plain', status=200)
    else:
        request.environ['logger'].message("POST_USER", 'auth fail')
        return Response(u'You are not authorized to do this action', mimetype= 'text/plain', status=401)
    
@user_blueprint.route('/', methods=['DELETE'])
def delete_user():
    user = request.environ['user'] # get issuing user
    if user.isAnon():
        request.environ['logger'].message("DELETE_USER", 'auth fail')
        return Response(u'You are not authorized to do this action', mimetype= 'text/plain', status=401)
    
    user.delete(request.environ['cursor'])
    try:
        delete_picture(user.name)
    except FileNotFoundError:
        pass
    request.environ['logger'].message("DELTE_USER", f'deleted user {user.name}')
    return Response(u'Deleted user', mimetype= 'text/plain', status=200)