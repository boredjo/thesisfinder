from flask import Flask, request
from werkzeug.wrappers import Request, Response, ResponseStream

from utils.auth import auth_middleware
from routes.profilepicture import profile_picture_blueprint
from routes.user import user_blueprint

app = Flask('ThesisFinder')

# calling our middleware
app.wsgi_app = auth_middleware(app.wsgi_app)

# import routes
app.register_blueprint(profile_picture_blueprint, url_prefix='/profilepicture')
app.register_blueprint(user_blueprint, url_prefix='/user')


@app.route('/', methods=['GET', 'POST'])
def hello():
    user = request.environ['user']
    user.store()
    return user.jsonify()

if __name__ == "__main__":
    app.run('0.0.0.0', '3000', debug=True)