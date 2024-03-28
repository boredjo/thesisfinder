from werkzeug.wrappers import Request, Response
from werkzeug.exceptions import BadRequest
import bcrypt

from utils.logs import Logger

# onyl use first 4 characters
JSON_PATHS = [
    "/use", # /user
    "/log", # /login
    "/ide", # /idea
]

IMAGE_PATHS = [
    "/pro", # /profilepicture
]

ALLOWED_EXTENSIONS = set(['png'])

def get_hashed_password(plain_text_password):
    # Hash a password for the first time
    #   (Using bcrypt, the salt is saved into the hash itself)
    return bcrypt.hashpw(plain_text_password, bcrypt.gensalt())

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class parse_middleware():
    
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        request = Request(environ)
        # if request.path.startswith("/doc"): # pass trough for the documentation
        #     return self.app(environ, start_response)

        # establish logger
        if not 'logger' in environ.keys():
            environ['logger'] = Logger()

        environ['logger'].message('HEADER', list(request.headers))
        # do not parse GET request
        if request.method in ['GET', 'DELETE', 'OPTION']:
            return self.app(environ, start_response)
        
        if request.path[:4] in JSON_PATHS: 
            if 'Content-Type' in request.headers.keys() and request.headers['Content-Type'] == 'application/json':
                try:
                    data = request.get_json()
                    if 'password' in data.keys():
                        password = data['password']
                        if len(password) > 64:
                            environ['logger'].message('BODY', 'Password too long')
                            res = Response(u"Password is too long (64 max)", mimetype= 'text/plain', status=422)
                            return res(environ, start_response)
                    environ['parsed_data'] = data 
                    environ['logger'].message('BODY', environ['parsed_data'])
                    return self.app(environ, start_response)
                except BadRequest as e:
                    environ['logger'].error(e, 'parse.py - casting to json')
                    res = Response(u"Couldn't process the request", mimetype= 'text/plain', status=422)
                    return res(environ, start_response)
                
            # block non json calls
            environ['logger'].message('NOT JSON')
            res = Response(u'This endpoint only processes application/json content', mimetype= 'text/plain', status=422)
            return res(environ, start_response)


        elif request.path[:4] in IMAGE_PATHS: return self.parse_image(request, environ, start_response)
                   
        environ['logger'].message("PARSE", f'unkown path {request.path}')
        res = Response(u"Couldn't process the request", mimetype= 'text/plain', status=422)
        return res(environ, start_response)

    def parse_image(self, request, environ, start_response):
        if 'Content-Type' in request.headers.keys() and request.headers['Content-Type'] == 'image/png':
            environ['parsed_data'] = request.get_data()
            environ['logger'].message('BODY', 'parsed binary')
            return self.app(environ, start_response)
        
        # block non png calls
        environ['logger'].message('NOT PNG')
        res = Response(u'This endpoint only processes image/png content', mimetype= 'text/plain', status=422)
        return res(environ, start_response)