from werkzeug.wrappers import Response
from flask import Blueprint, request
from models.user import User
from utils.db import util_db
from utils.auth import util_auth
from utils.parse import parse_png
from utils.logs import Logger
from PIL import Image
import os


PICTURE_PATH = "../database/profile_pics/"

profile_picture_blueprint = Blueprint('profilepicture', __name__)

def load_binary(filename):
    with open(filename, 'rb') as file_handle:
        return file_handle.read()
    
def store_binary(filename, binary):
    with open(filename, 'wb') as file_handle:
        file_handle.write(binary)

def delete_picture(username):
    os.remove(PICTURE_PATH + username + ".png")


def resize_image(username):
    im = Image.open(PICTURE_PATH + username + ".png")
    im = im.resize((86, 86))
    im.save(PICTURE_PATH + username + ".png")

@profile_picture_blueprint.route('/<path:username>', methods=['GET'])
def get_profile_picture(username):
    if not username  == 'anonymous':
        try:
            file = load_binary(PICTURE_PATH + username + ".png")
        except:
            file = load_binary("../assets/default_picture.png")
    else:
        file = load_binary("../assets/anonymous.png")
    return Response(file, mimetype= 'image/png', status=200)

@profile_picture_blueprint.route('/', methods=['POST'])
@util_db()
@util_auth()
@parse_png()
def post_profile_picture(image, cursor, user:User):
    logger:Logger = request.environ['logger']
    if user.isAnon():
        logger.message("POST_PROFILEPIC", "Can't upload picture as anonymous user.")
        return Response(u'no auth', mimetype= 'text/plain', status=401)
    else:
        store_binary(PICTURE_PATH + user.name + ".png", image)
        resize_image(user.name)
        logger.message("PROFILEPIC", f"Updated file {PICTURE_PATH + user.name}.png")
        return Response(u'Image updated', mimetype= 'text/plain', status=200)
    
@profile_picture_blueprint.route('/', methods=['DELETE'])
@util_db()
@util_auth()
def delete_profilepicture(cursor, user:User):
    logger:Logger = request.environ['logger']
    if user.isAnon():
        logger.message("DELETE_PROFILEPIC", 'auth fail')
        return Response(u'no auth', mimetype= 'text/plain', status=401)
    
    else:
        try:
            delete_picture(user.name)
        except FileNotFoundError:
            logger.message("PROFILEPIC", "image not found")
            return Response(u'no image', mimetype= 'text/plain', status=422)
        logger.message("PROFILEPIC", f"Updated file {PICTURE_PATH + user.name}.png")
        return Response(u'Image deleted', mimetype= 'text/plain', status=200)
