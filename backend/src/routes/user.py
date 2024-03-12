from werkzeug.wrappers import Request, Response, ResponseStream
from flask import Blueprint, request
from models.user import User

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
        data = request.get_json()
        new_user = User(data['user'], data['first_name'], data['last_name'], data['country'], data['email'], data['password'])
    except:
        return Response(u'Could process the request', mimetype= 'text/plain', status=422)
    
    # update database
    if user.name == new_user.name: # updateing user info
        if new_user.emailTaken():
            return Response(u'Username or Email is already taken', mimetype= 'text/plain', status=422)
        user.update(new_user)
        return Response(u'updating user info', mimetype= 'text/plain', status=200)
    elif user.isAnon(): # create new user
        if new_user.nameTaken():
            return Response(u'Username or Email is already taken', mimetype= 'text/plain', status=422)
        new_user.store()
        return Response(u'create new user', mimetype= 'text/plain', status=200)
    else:
        return Response(u'You are not authorized to do this action', mimetype= 'text/plain', status=401)