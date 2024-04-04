from werkzeug.wrappers import Response
from flask import Blueprint, request, jsonify
import mysql.connector
from mysql.connector import cursor


from utils.db import util_db
from utils.auth import util_auth
from utils.parse import parse_json
from utils.logs import Logger
from models.sponsor import Sponsor
from models.user import User


sponsor_blueprint = Blueprint('sponsor', __name__)

@sponsor_blueprint.route('/user/', methods=['GET'])
@util_db()
@util_auth()
def get_user_sponsors(cursor:cursor, user:User):
    logger:Logger = request.environ['logger']

    try:
        data = Sponsor.find_sponsor_by_user(user.name, cursor)
    except mysql.connector.Error as err:
        logger.error(err, 'routes/sponsor.py - get_user_sponsors() - find sponsors')
        data = []

    return jsonify(sponsors=[
        {
            "id" : sponsor.id,
            "idea": sponsor.idea,
            "author": sponsor.author,
            "date_posted": sponsor.date_posted,
            "deadline": sponsor.deadline,
            "amount": sponsor.amount
        }
        for sponsor in data
    ])

@sponsor_blueprint.route('/user/<path:username>', methods=['GET'])
@util_db()
@util_auth()
def get_username_sponsors(cursor:cursor, user:User, username):
    logger:Logger = request.environ['logger']
    try:
        user = User.find_user(username, cursor)
    except mysql.connector.Error as err:
        logger.error(err, 'routes/sponsor.py - get_username_sponsors() - find user')
        return Response(u'User not found', mimetype= 'text/plain', status=422)
    
    try:
        data = Sponsor.find_sponsor_by_user(user.name, cursor)
    except mysql.connector.Error as err:
        logger.error(err, 'routes/sponsor.py - get_username_sponsors() - find sponsors')
        data = []

    return jsonify(sponsors=[
        {
            "id" : sponsor.id,
            "idea": sponsor.idea,
            "author": sponsor.author,
            "date_posted": sponsor.date_posted,
            "deadline": sponsor.deadline,
            "amount": sponsor.amount
        }
        for sponsor in data
    ])

@sponsor_blueprint.route('/idea/<path:idea>', methods=['GET'])
@util_db()
def get_idea_sponsor(cursor:cursor,  idea):
    logger:Logger = request.environ['logger']
    try:
        data = Sponsor.find_sponsor_by_idea(idea, cursor)
    except mysql.connector.Error as err:
        logger.error(err, 'routes/sponsor.py - get_idea_sponsor() - find claims')
        data = []

    return jsonify(sponsors=[
        {
            "id" : sponsor.id,
            "idea": sponsor.idea,
            "author": sponsor.author,
            "date_posted": sponsor.date_posted,
            "deadline": sponsor.deadline,
            "amount": sponsor.amount
        }
        for sponsor in data
    ])


@sponsor_blueprint.route('/', methods=['POST'])
@util_db()
@util_auth()
@parse_json(['idea', 'amount', 'description', 'deadline'])
def post_sponsorship(data, cursor:cursor, user:User):
    logger:Logger = request.environ['logger']

    if user.isAnon():
        logger.message("POST_SPONSOR", "not authenticated")
        return Response(u'You need to be authenticated', mimetype= 'text/plain', status=401)
    
    new_sponsor = Sponsor('', user.name, data['idea'], data['amount'], data['description'], deadline=data['deadline'])

    # store sponsor
    try:
        new_sponsor.store(cursor)
    except mysql.connector.errors.IntegrityError as err:
        logger.error(err, 'routes/sponsor.py - post_sponsorship() - store sponsor')
        
        logger.message("POST_SPONSOR", 'sponsorship already exists')
        return Response(u'The sponsorship already exists', mimetype= 'text/plain', status=422)
    
    logger.message("POST_SPONSOR", f'idea {new_sponsor.idea} was sponsored by {new_sponsor.author}')
    return jsonify({"id": new_sponsor.id})

    
@sponsor_blueprint.route('/<path:id>', methods=['DELETE'])
@util_db()
@util_auth()
def delete_sponsor(cursor:cursor, user:User, id:str):
    logger:Logger = request.environ['logger']
    try:
        sponsor = Sponsor.get_sponsorship(id, cursor)
        sponsor.delete(cursor)
    except mysql.connector.Error as err:
        logger.message("DELETE_SPONSOR", "Sponsorship doesn't exists")
        return Response(u"The sponsorship doesn't exists", mimetype= 'text/plain', status=422)

    logger.message("DELETE_SPONSOR", f'The sponsorship {sponsor.id} was removed')
    return Response(u'sponsorship deleted', mimetype= 'text/plain', status=200)


@sponsor_blueprint.route('/<path:id>', methods=['GET'])
@util_db()
def get_sponsorship(cursor:cursor, id):
    logger:Logger = request.environ['logger']
    try:
        sponsor = Sponsor.get_sponsorship(id, cursor)
    except Exception:
        logger.message("DELETE_SPONSOR", "Sponsorship doesn't exists")
        return Response(u"The sponsorship doesn't exists", mimetype= 'text/plain', status=422)

    return sponsor.jsonify()