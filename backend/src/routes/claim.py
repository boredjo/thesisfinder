from werkzeug.wrappers import Response
from flask import Blueprint, request, jsonify
import mysql.connector
from mysql.connector import cursor

from utils.db import util_db
from utils.auth import util_auth
from utils.parse import parse_json
from utils.logs import Logger
from models.claim import Claim
from models.user import User


claim_blueprint = Blueprint('claim', __name__)

@claim_blueprint.route('/user/ ', methods=['GET'])
@util_db()
@util_auth()
def get_user_claims(cursor:cursor, user:User):
    logger:Logger = request.environ['logger']
    try:
        data = Claim.find_claims_by_user(user.name, cursor)
    except Exception as err:
        logger.error(err, 'routes/claim.py - get_user_claims() - find claims')
        data = []

    return jsonify(claims=[
        {
            "idea" : claim.idea,
            "author": claim.author,
            "date_posted": claim.date_posted,
            "attachments": claim.attachments,
        }
        for claim in data
    ])

@claim_blueprint.route('/user/<path:username>', methods=['GET'])
@util_db()
def get_username_claims(cursor:cursor, username):
    logger:Logger = request.environ['logger']
    try:
        user = User.find_user(username, cursor)
    except Exception as err:
        logger.error(err, 'routes/claim.py - get_user_claims() - find user')
        return Response(u'no user', mimetype= 'text/plain', status=422)
    
    try:
        data = Claim.find_claims_by_user(user.name, cursor)
    except Exception as err:
        logger.error(err, 'routes/claim.py - get_user_claims() - find claims')
        data = []

    return jsonify(claims=[
        {
            "idea" : claim.idea,
            "author": claim.author,
            "date_posted": claim.date_posted,
            "attachments": claim.attachments,
        }
        for claim in data
    ])

@claim_blueprint.route('/idea/<path:idea>', methods=['GET'])
@util_db()
def get_idea_claims(cursor:cursor, idea):
    logger:Logger = request.environ['logger']
    try:
        data = Claim.find_claims_by_idea(idea, cursor)
    except mysql.connector.Error as err:
        logger.error(err, 'routes/claim.py - get_user_claims() - find claims')
        data = []

    return jsonify(claims=[
        {
            "idea" : claim.idea,
            "author": claim.author,
            "date_posted": claim.date_posted,
            "attachments": claim.attachments,
        }
        for claim in data
    ])


@claim_blueprint.route('/', methods=['POST'])
@util_db()
@util_auth()
@parse_json(['idea'])
def post_claim(data, cursor:cursor, user:User):
    logger:Logger = request.environ['logger']
    if user.isAnon():
        logger.message("POST_Claim", "not authenticated")
        return Response(u'no auth', mimetype= 'text/plain', status=401)
    
    new_claim = Claim(user.name, data['idea'])

    # store claim
    try:
        new_claim.store(cursor)
    except mysql.connector.errors.IntegrityError as err:
        logger.error(err, 'routes/claim.py - get_user_claims() - find claims')
        logger.message("POST_CLAIM", 'claim already exists')
        return Response(u'not unique', mimetype= 'text/plain', status=422)
    
    except Exception as e:
        logger.error(e, 'routes/claim.py - get_user_claims() - find claims')
        return Response(u'no idea', mimetype= 'text/plain', status=422)
    
    logger.message("POST_IDEA", f'idea {new_claim.idea} was claimed by {new_claim.author}')
    return Response(u'idea claimed', mimetype= 'text/plain', status=200)

    
@claim_blueprint.route('/<path:idea>', methods=['DELETE'])
@util_db()
@util_auth()
def delete_claim(cursor:cursor, user:User, idea:str):
    logger:Logger = request.environ['logger']
    claim = Claim(user.name, idea)

    try: 
        claim.delete(cursor)
    except mysql.connector.Error as err:
        logger.message("DELETE_CLAIM", "claim doesn't exists")
        return Response(u"no claim", mimetype= 'text/plain', status=422)

    logger.message("DELETE_IDEA", f'The claim onidea {claim.idea} by {claim.author} was removed')
    return Response(u'claim deleted', mimetype= 'text/plain', status=200)