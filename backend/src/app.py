from flask import Flask, send_from_directory, request, g as app_ctx
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.wrappers import Response
import time
import os

load_dotenv('.env') # load env if possible

from utils.db import rebase
from utils.logs import log_middleware
from utils.check_permissions import pre_check
from routes.profilepicture import profile_picture_blueprint
from routes.user import user_blueprint
from routes.login import login_blueprint
from routes.idea import idea_blueprint
from routes.claim import claim_blueprint
from routes.sponsor import sponsor_blueprint

pre_check() # check folder structure
if os.environ['RESET_DB'] == 'True': rebase()

app = Flask('ThesisFinder')
cors = CORS(app)


@app.before_request
def logging_before():
    # Store the start time for the request
    app_ctx.start_time = time.perf_counter()

@app.before_request
def cors_before():
    if request.method in ['OPTIONS']:
        res = Response(u"sucess", mimetype= 'text/plain', status=200)
        res.headers['Access-Control-Allow-Origin'] = '*'
        res.headers['Access-Control-Allow-Headers'] = '*'
        res.headers['Access-Control-Allow-Methods'] = '*'
        return res
       


@app.after_request
def logging_after(response):
    # Get total time in milliseconds
    total_time = time.perf_counter() - app_ctx.start_time
    time_in_ms = int(total_time * 1000)
    # Log the time taken for the endpoint 
    request.environ['logger'].message("DONE", f'time: {time_in_ms}')
    return response

# calling our middleware
app.wsgi_app = log_middleware(app.wsgi_app)

# import routes
app.register_blueprint(profile_picture_blueprint, url_prefix='/profilepicture')
app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(login_blueprint, url_prefix='/login')
app.register_blueprint(idea_blueprint, url_prefix='/idea')
app.register_blueprint(claim_blueprint, url_prefix='/claim')
app.register_blueprint(sponsor_blueprint, url_prefix='/sponsor')


# serve api documentation
@app.route('/doc/')
def serve_documentation():
    return send_from_directory('static', 'index.html')

@app.route('/doc/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == "__main__":
    app.run('0.0.0.0', '3000')