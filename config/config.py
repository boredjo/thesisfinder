# config/config.py

# Make sure to replace "replace_this_with_a_secure_key" with a secure 
# secret key for the SECRET_KEY configuration. Also, adjust the 
# SQLALCHEMY_DATABASE_URI based on your MySQL configuration.

import os

class Config:
    """
    Base configuration class for the Flask application.
    """
    SECRET_KEY = os.environ.get("SECRET_KEY") or "replace_this_with_a_secure_key"
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "mysql://username:password@localhost/thesisfinder"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    """
    Development-specific configuration class.
    """
    DEBUG = True

class ProductionConfig(Config):
    """
    Production-specific configuration class.
    """
    DEBUG = False

config_by_name = dict(
    dev=DevelopmentConfig,
    prod=ProductionConfig
)
