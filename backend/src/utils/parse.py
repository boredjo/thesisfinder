from werkzeug.wrappers import Request, Response, ResponseStream
from werkzeug.exceptions import BadRequest
from utils.logs import Logger


class parse_middleware():
    
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        request = Request(environ)
        if request.path == '/': # pass trough for the documentation
            return self.app(environ, start_response)
        

        # establish logger
        if not 'logger' in environ.keys():
            environ['logger'] = Logger()

        environ['logger'].message('HEADER', list(request.headers))
 
        if 'Content-Type' in request.headers.keys() and request.headers['Content-Type'] == 'application/json':
            try:
                environ['parsed_data'] = request.get_json()
                environ['logger'].message('BODY', environ['parsed_data'])
                return self.app(environ, start_response)
            except BadRequest as e:
                environ['logger'].error(e, 'parse.py - casting to json')
                res = Response(u'Could process the request', mimetype= 'text/plain', status=422)
                return res(environ, start_response)
            
        # block non json calls
        environ['logger'].message('NOT JSON')
        res = Response(u'This API only processes application/json content', mimetype= 'text/plain', status=422)
        return res(environ, start_response)
    
        