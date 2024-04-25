from werkzeug.wrappers import Response
from flask import Blueprint, request, jsonify
import mysql.connector
from mysql.connector import cursor


from utils.db import util_db
from utils.auth import util_auth
from utils.parse import parse_json
from utils.logs import Logger
from models.user import User
from models.idea import Idea
from routes.profilepicture import delete_picture

idea_blueprint = Blueprint('idea', __name__)

with open('sql/data/03-tags.sql', 'r') as f_in:
    lines = f_in.readlines()[1:-1]
    tags = [line[2:-4] for line in lines]

@idea_blueprint.route('/featured/', methods=['GET'])
@idea_blueprint.route('/featured/<path:n>', methods=['GET'])
@util_db()
def get_featured_ideas(cursor:cursor, n=5):
    data = Idea.get_random(int(n), cursor)
    # print(data[0].short_jsonify())
    # json_array = [idea.short_jsonify() for idea in data]
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


@idea_blueprint.route('/search/<path:query>', methods=['GET'])
@util_db()
def get_search_ideas(cursor:cursor, query:str):
    data = Idea.get_serach(5, query, cursor)
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


@idea_blueprint.route('/details/<path:idea_id>', methods=['GET'])
@util_db()
def get_idea_details(cursor:cursor, idea_id):
    logger:Logger = request.environ['logger']

    try: 
        idea = Idea.find_idea(idea_id, cursor)
    except mysql.connector.Error as err:
        logger.error(err, 'routes/idea.py - get_idea_details() - find idea')
        return Response(u'no idea', mimetype= 'text/plain', status=422)
    
    return idea.jsonify()

@idea_blueprint.route('/', methods=['POST'])
@util_db()
@util_auth()
@parse_json(['title', 'tags', 'description'])
def post_idea(data, cursor:cursor, user:User): 
    logger:Logger = request.environ['logger']

    new_idea = Idea(data['title'], data['tags'], user.name, data['description'])


    for tag in new_idea.tags:
        if tag not in tags:
            logger.message("POST_IDEA", f'tag {tag} does not exists')
            return Response(u'invalid tag', mimetype= 'text/plain', status=422)
    # store idea
    try:
        new_idea.store(cursor)
    except mysql.connector.errors.IntegrityError:
        logger.message("POST_IDEA", 'idea already exists')
        return Response(u'not unique', mimetype= 'text/plain', status=422)
    
    logger.message("POST_IDEA", f'idea {new_idea.id} posted')
    return jsonify(id=new_idea.id)
   
@idea_blueprint.route('/<path:idea_id>', methods=['POST'])
@util_db()
@util_auth()
@parse_json(['tags', 'description'])
def update_idea(data, cursor:cursor, user:User, idea_id):
    logger:Logger = request.environ['logger']

    # parse incoming data
    try: 
        idea = Idea.find_idea(idea_id, cursor)
    except Exception as err:
        logger.message("UPDATE_IDEA", "idea doesn't exists")
        return Response(u"no idea", mimetype= 'text/plain', status=422)

    if not idea.author == user.name or user.isAnon():
        logger.message("UPDATE_IDEA", "not the author")
        return Response(u'no auth', mimetype= 'text/plain', status=401)

    if 'tags' in data.keys(): idea.tags = data['tags']
    if 'description' in data.keys(): idea.description = data['description']
    for tag in idea.tags:
        if tag not in tags:
            logger.message("POST_IDEA", f'tag {tag} does not exists')
            return Response(u'invalid tag', mimetype= 'text/plain', status=422)

    try: 
        idea.update(cursor)
    except mysql.connector.errors.IntegrityError:
        logger.message("UPDATE_IDEA", 'idea already exists')
        return Response(u'not unique', mimetype= 'text/plain', status=422)
    
    logger.message("UPDATE_IDEA", f'idea {idea.id} update')
    return Response(u'idea updated', mimetype= 'text/plain', status=200)
    
@idea_blueprint.route('/<path:idea_id>', methods=['DELETE'])
@util_db()
@util_auth()
def delete_idea(cursor:cursor, user:User, idea_id):
    logger:Logger = request.environ['logger']
    try: 
        idea = Idea.find_idea(idea_id, cursor)
    except mysql.connector.Error as err:
        logger.message("DELETE_IDEA", "idea doesn't exists")
        return Response(u"no idea", mimetype= 'text/plain', status=422)
    
    if not idea.author == user.name or user.isAnon():
        logger.message("DELETE_IDEA", "not the author")
        return Response(u'no auth', mimetype= 'text/plain', status=401)


    idea.delete(cursor)

    logger.message("DELETE_IDEA", f'idea {idea.id} deleted')
    return Response(u'idea deleted', mimetype= 'text/plain', status=200)


@idea_blueprint.route('/recommend/<path:ideaid>', methods=['GET'])
@util_db()
def get_recommended_ideas(cursor:cursor, ideaid):
    data = Idea.get_random(int(5), cursor)
    # print(data[0].short_jsonify())
    # json_array = [idea.short_jsonify() for idea in data]
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