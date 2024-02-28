 # scripts/setup_database.py

from flask_migrate import Migrate, upgrade
from app import create_app, db

app = create_app()

# Initialize Flask-Migrate
migrate = Migrate(app, db)

def setup_database():
    with app.app_context():
        # Apply database migrations
        upgrade()

if __name__ == "__main__":
    setup_database()
