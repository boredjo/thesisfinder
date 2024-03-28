from werkzeug.wrappers import Response
from flask import Blueprint, request, jsonify
import mysql.connector


from models.claim import Claim
from models.user import User


claim_blueprint = Blueprint('claim', __name__)

@claim_blueprint.route('/user/', methods=['GET'])
def get_user_claims():
    user = request.environ['user'] # get issuing user
    try:
        data = Claim.find_claims_by_user(user.username, request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].error(e, 'routes/claim.py - get_user_claims() - find claims')
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
def get_user_claims(username):
    try:
        user = User.find_user(username, request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].error(e, 'routes/claim.py - get_user_claims() - find user')
        return Response(u'User not found', mimetype= 'text/plain', status=422)
    
    try:
        data = Claim.find_claims_by_user(user.username, request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].error(e, 'routes/claim.py - get_user_claims() - find claims')
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

@claim_blueprint.route('/user/<path:idea>', methods=['GET'])
def get_user_claims(idea):
    try:
        data = Claim.find_claims_by_idea(idea, request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].error(e, 'routes/claim.py - get_user_claims() - find claims')
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
def post_claim():
    user = request.environ['user'] # get issuing user
    if user.isAnon():
        request.environ['logger'].message("POST_Claim", "not authenticated")
        return Response(u'You need to be authenticated', mimetype= 'text/plain', status=401)
    
    # parse incoming data
    try:
        data = request.environ['parsed_data']
        new_claim = Claim(user.name, data['idea'])
    except Exception as e:
        request.environ['logger'].error(e, 'routes/claim.py - post_claim() - parse new claim data')
        return Response(u'Could process the request', mimetype= 'text/plain', status=422)

    # store claim
    try:
        new_claim.store(request.environ['cursor'])
    except mysql.connector.errors.IntegrityError:
        request.environ['logger'].message("POST_CLAIM", 'claim already exists')
        return Response(u'The claim already exists', mimetype= 'text/plain', status=422)
    
    request.environ['logger'].message("POST_IDEA", f'idea {new_claim.ida} was claimed by {new_claim.author}')
    return Response(u'idea claimed', mimetype= 'text/plain', status=200)

    
@claim_blueprint.route('/', methods=['DELETE'])
def delete_claim():
    user = request.environ['user'] # get issuing user

    # parse incoming data
    try:
        data = request.environ['parsed_data']
        claim = Claim(user.name, data['idea'])
    except Exception as e:
        request.environ['logger'].error(e, 'routes/claim.py - delete_claim() - parse claim data')
        return Response(u'Could process the request', mimetype= 'text/plain', status=422)


    try: 
        claim.delete()
    except mysql.connector.Error as err:
        request.environ['logger'].message("DELETE_CLAIM", "claim doesn't exists")
        return Response(u"The claim doesn't exists", mimetype= 'text/plain', status=422)

    request.environ['logger'].message("DELETE_IDEA", f'The claim onidea {claim.ida} by {claim.author} was removed')
    return Response(u'claim deleted', mimetype= 'text/plain', status=200)