from werkzeug.wrappers import Request, Response, ResponseStream
from flask import Blueprint, request
from models.user import user

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/', methods=['GET'])
def get_user():
    user = request.environ['user']
    return user.jsonify()

@user_blueprint.route('/', methods=['POST'])
def post_user():
    user = request.environ['user']
    try:
        data = request.get_json()
        new_user = user.(data['name'], data['first_name'], data['last_name'], data['country'], data['email'], data['password_hash'])
    except:
        return Response(u'Could process the request', mimetype= 'text/plain', status=422)
    if user.name == new_user.name: # updateing user info
        user.update(new_user)
        return Response(u'updating user info', mimetype= 'text/plain', status=200)
    elif user.isAnon(): # create new user
        new_user.store()
        return Response(u'create new user', mimetype= 'text/plain', status=200)
    else:
        return Response(u'You are not authorized to do this action', mimetype= 'text/plain', status=401)