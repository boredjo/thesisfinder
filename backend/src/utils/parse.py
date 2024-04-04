from werkzeug.wrappers import Response
from werkzeug.exceptions import BadRequest
from flask import request
from functools import wraps


from utils.logs import Logger


ALLOWED_EXTENSIONS = set(['png'])


def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
 
def parse_json(keys):
    def _json_decorator(f):
        @wraps(f)
        def __json_decorator(*args, **kwargs):
            logger:Logger = request.environ['logger']

            if 'Content-Type' in request.headers.keys() and request.headers['Content-Type'] == 'application/json':
                try:
                    data = request.get_json()
                except BadRequest as e:
                    logger.error(e, 'parse.py - parse_json() - converting request to json')
                    return Response(u"Couldn't process the request", mimetype= 'text/plain', status=422)

                parsed_data = {}
                for key in keys:
                    if key in data.keys():
                        parsed_data[key]=data[key]
                    else:
                        logger.message('JSON', f"key {key} not found")
                        return Response(u"Key '" + key + u"' is missing from json", mimetype= 'text/plain', status=422)
                    
                if 'password' in keys and len(parsed_data['password']) > 64:
                    logger.message('BODY', 'Password too long')
                    return Response(u"Password is too long (64 max)", mimetype= 'text/plain', status=422)

                logger.message('BODY', parsed_data)
                
            else:     
                # block non json calls
                logger.message('NOT JSON')
                return Response(u'This endpoint only processes application/json content', mimetype= 'text/plain', status=422)
            
            result = f(parsed_data, *args, **kwargs)
            return result
        return __json_decorator
    return _json_decorator

def parse_png():
    def _png_decorator(f):
        @wraps(f)
        def __png_decorator(*args, **kwargs):
            logger:Logger = request.environ['logger']

            if 'Content-Type' in request.headers.keys() and request.headers['Content-Type'] == 'image/png':
                    image = request.get_data()
                    logger.message('BODY', 'parsed binary')

            else:     
                logger.message('NOT PNG')
                return Response(u'This endpoint only processes image/png content', mimetype= 'text/plain', status=422)
            
            result = f(image, *args, **kwargs)
            return result
        return __png_decorator
    return _png_decorator