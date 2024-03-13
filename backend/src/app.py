from flask import Flask, request, current_app
from werkzeug.wrappers import Request, Response, ResponseStream

from utils.auth import auth_middleware
from utils.db import mysql_middleware
from utils.parse import parse_middleware
from routes.profilepicture import profile_picture_blueprint
from routes.user import user_blueprint
from routes.login import login_blueprint


app = Flask('ThesisFinder')

@app.route('/', methods=['GET', 'POST'])
def hello():
    return current_app.send_static_file('../documentation/build/index.html')
    
# calling our middleware
app.wsgi_app = auth_middleware(app.wsgi_app)
app.wsgi_app = mysql_middleware(app.wsgi_app)
app.wsgi_app = parse_middleware(app.wsgi_app)

# import routes
app.register_blueprint(profile_picture_blueprint, url_prefix='/profilepicture')
app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(login_blueprint, url_prefix='/login')



if __name__ == "__main__":
    app.run('0.0.0.0', '3000')