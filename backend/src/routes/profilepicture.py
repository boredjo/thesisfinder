from werkzeug.wrappers import Response
from flask import Blueprint, request
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
    im = im.resize((256, 256))
    im.save(PICTURE_PATH + username + ".png")

@profile_picture_blueprint.route('/', methods=['GET'])
def get_profile_picture():
    user = request.environ['user']
    try:
        file = load_binary(PICTURE_PATH + user.name + ".png")
    except:
        file = load_binary("../assets/default_picture.png")  
    return Response(file, mimetype= 'image/png', status=200)

@profile_picture_blueprint.route('/', methods=['POST'])
def post_profile_picture():
    user = request.environ['user']
    if user.isAnon():
        request.environ['logger'].message("POST_PROFILEPIC", "Can't upload picture as anonymous user.")
        return Response(u'You need to be authenticated for this action', mimetype= 'text/plain', status=401)
    else:
        store_binary(PICTURE_PATH + user.name + ".png", request.environ['parsed_data'])
        resize_image(user.name)
        request.environ['logger'].message("PROFILEPIC", f"Updated file {PICTURE_PATH + user.name}.png")
        return Response(u'Image updated', mimetype= 'text/plain', status=200)
    
@profile_picture_blueprint.route('/', methods=['DELETE'])
def delete_profilepicture():
    user = request.environ['user'] # get issuing user
    if user.isAnon():
        request.environ['logger'].message("DELETE_PROFILEPIC", 'auth fail')
        return Response(u'You are not authorized to do this action', mimetype= 'text/plain', status=401)

