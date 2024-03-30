from werkzeug.wrappers import Response
from flask import Blueprint, request, jsonify
import mysql.connector


from models.sponsor import Sponsor
from models.user import User


sponsor_blueprint = Blueprint('sponsor', __name__)

@sponsor_blueprint.route('/user/', methods=['GET'])
def get_user_sponsors():
    user = request.environ['user'] # get issuing user
    try:
        data = Sponsor.find_sponsor_by_user(user.name, request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].error(err, 'routes/sponsor.py - get_user_sponsors() - find sponsors')
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
def get_username_sponsors(username):
    try:
        user = User.find_user(username, request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].error(err, 'routes/sponsor.py - get_username_sponsors() - find user')
        return Response(u'User not found', mimetype= 'text/plain', status=422)
    
    try:
        data = Sponsor.find_sponsor_by_user(user.name, request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].error(err, 'routes/sponsor.py - get_username_sponsors() - find sponsors')
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
def get_idea_sponsor(idea):
    try:
        data = Sponsor.find_sponsor_by_idea(idea, request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].error(err, 'routes/sponsor.py - get_idea_sponsor() - find claims')
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
def post_sponsorship():
    user = request.environ['user'] # get issuing user
    if user.isAnon():
        request.environ['logger'].message("POST_SPONSOR", "not authenticated")
        return Response(u'You need to be authenticated', mimetype= 'text/plain', status=401)
    
    # parse incoming data
    try:
        data = request.environ['parsed_data']
        new_sponsor = Sponsor('', user.name, data['idea'], data['amount'], data['description'], deadline=data['deadline'])
    except Exception as e:
        request.environ['logger'].error(e, 'routes/sponsor.py - post_sponsor() - parse new sponsor data')
        return Response(u'Could process the request', mimetype= 'text/plain', status=422)

    # store sponsor
    try:
        new_sponsor.store(request.environ['cursor'])
    except mysql.connector.errors.IntegrityError as err:
        request.environ['logger'].error(err, 'routes/sponsor.py - post_sponsorship() - store sponsor')
        
        request.environ['logger'].message("POST_SPONSOR", 'sponsorship already exists')
        return Response(u'The sponsorship already exists', mimetype= 'text/plain', status=422)
    
    request.environ['logger'].message("POST_SPONSOR", f'idea {new_sponsor.idea} was sponsored by {new_sponsor.author}')
    return jsonify({"id": new_sponsor.id})

    
@sponsor_blueprint.route('/<path:id>', methods=['DELETE'])
def delete_sponsor(id):
    try:
        sponsor = Sponsor.get_sponsorship(id, request.environ['cursor'])
        sponsor.delete(request.environ['cursor'])
    except mysql.connector.Error as err:
        request.environ['logger'].message("DELETE_SPONSOR", "Sponsorship doesn't exists")
        return Response(u"The sponsorship doesn't exists", mimetype= 'text/plain', status=422)

    request.environ['logger'].message("DELETE_SPONSOR", f'The sponsorship {sponsor.id} was removed')
    return Response(u'sponsorship deleted', mimetype= 'text/plain', status=200)


@sponsor_blueprint.route('/<path:id>', methods=['GET'])
def get_sponsorship(id):
    try:
        sponsor = Sponsor.get_sponsorship(id, request.environ['cursor'])
    except Exception:
        request.environ['logger'].message("DELETE_SPONSOR", "Sponsorship doesn't exists")
        return Response(u"The sponsorship doesn't exists", mimetype= 'text/plain', status=422)

    return sponsor.jsonify()