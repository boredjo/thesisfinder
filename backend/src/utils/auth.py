 
from werkzeug.wrappers import Request, Response, ResponseStream
from models.user import user
class auth_middleware():
    '''
    Simple auth WSGI middleware
    https://medium.com/swlh/creating-middlewares-with-python-flask-166bd03f2fd4
    '''

    def __init__(self, app):
        self.app = app


    def __call__(self, environ, start_response):
        request = Request(environ)
        try:
            userName = request.authorization['username']
            password = request.authorization['password']
        except:
            res = Response(u'Authorization is needed', mimetype= 'text/plain', status=401)
            return res(environ, start_response)
        
        if userName == "anonymous":
            environ['user'] = user.ANON()
            return self.app(environ, start_response)

        if userName == "jo":
            environ['user'] = user.find_user(userName)
            return self.app(environ, start_response)
        
        res = Response(u'Authorization failed', mimetype= 'text/plain', status=401)
        return res(environ, start_response)