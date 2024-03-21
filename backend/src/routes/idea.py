from werkzeug.wrappers import Response
from flask import Blueprint, request, jsonify
import mysql.connector


from models.user import User
from models.idea import Idea
from routes.profilepicture import delete_picture

idea_blueprint = Blueprint('idea', __name__)

@idea_blueprint.route('/featured', methods=['GET'])
def get_featured_ideas():

    user = request.environ['user']
    return user.jsonify()

@idea_blueprint.route('/details/<path:idea_id>', methods=['GET'])
def get_idea_details(idea_id):
    user = request.environ['user'] # get issuing user
    # parse incoming data
    try: 
        idea = Idea.find_idea(idea_id, request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].error(e, 'routes/idea.py - get_idea_details() - find idea')
    
    return idea.jsonify()

@idea_blueprint.route('/', methods=['POST'])
def post_idea():
    user = request.environ['user'] # get issuing user
    # parse incoming data
    try:
        data = request.environ['parsed_data']
        new_idea = Idea(data['title'], data['tags'], user.name, data['description'])
    except Exception as e:
        request.environ['logger'].error(e, 'routes/idea.py - post_idea() - parse new idea data')
        return Response(u'Could process the request', mimetype= 'text/plain', status=422)
    
    # store idea
    try:
        new_idea.store(request.environ['cursor'])
    except mysql.connector.errors.IntegrityError:
        request.environ['logger'].message("POST_IDEA", 'idea already exists')
        return Response(u'The title already exists', mimetype= 'text/plain', status=422)
    
    request.environ['logger'].message("POST_IDEA", f'idea {new_idea.id} posted')
    return jsonify(id=new_idea.id)
   
@idea_blueprint.route('/<path:idea_id>', methods=['POST'])
def update_idea(idea_id):
    user = request.environ['user'] # get issuing user
    # parse incoming data
    try: 
        idea = Idea.find_idea(idea_id, request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].message("UPDATE_IDEA", "idea doesn't exists")
        return Response(u"The idea doesn't exists", mimetype= 'text/plain', status=422)

    print(idea.author , idea.author == user.name)
    if not idea.author == user.name or user.isAnon():
        request.environ['logger'].message("UPDATE_IDEA", "not the author")
        return Response(u'You are not authorized to do this action', mimetype= 'text/plain', status=401)

    data = request.environ['parsed_data']
    if 'tags' in data.keys(): idea.tags = data['tags']
    if 'description' in data.keys(): idea.tags = data['description']
    if 'title' in data.keys(): idea.title = data['title']

    try: 
        idea.update(request.environ['cursor'])
    except mysql.connector.errors.IntegrityError:
        request.environ['logger'].message("UPDATE_IDEA", 'idea already exists')
        return Response(u'The title already exists', mimetype= 'text/plain', status=422)
    
    request.environ['logger'].message("UPDATE_IDEA", f'idea {idea.id} update')
    return Response(u'idea updated', mimetype= 'text/plain', status=200)
    
# @idea_blueprint.route('/', methods=['DELETE'])
# def delete_user():
#     user = request.environ['user'] # get issuing user
#     if user.isAnon():
#         request.environ['logger'].message("DELETE_USER", 'auth fail')
#         return Response(u'You are not authorized to do this action', mimetype= 'text/plain', status=401)
    
#     user.delete(request.environ['cursor'])
#     try:
#         delete_picture(user.name)
#     except FileNotFoundError:
#         pass
#     request.environ['logger'].message("DELTE_USER", f'deleted user {user.name}')
#     return Response(u'Deleted user', mimetype= 'text/plain', status=200)