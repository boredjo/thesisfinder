from werkzeug.wrappers import Request, Response, ResponseStream
from flask import Blueprint, request

PICTURE_PATH = "./database/profile_pics/"

profile_picture_blueprint = Blueprint('profilepicture', __name__)

def load_binary(filename):
    with open(filename, 'rb') as file_handle:
        return file_handle.read()

@profile_picture_blueprint.route('/', methods=['GET', 'POST'])
def get_profile_picture():
    user = request.environ['user']
    try:
        file = load_binary(PICTURE_PATH + user.name + ".png")
    except:
        file = load_binary("./assets/default_picture.png")  
    return Response(file, mimetype= 'image/png', status=200)