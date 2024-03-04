from flask import jsonify

class user:
    @classmethod
    def ANON(cls):
        return cls('anonymous', 'Anonymous', 'User', 'US', '', ' ')
    
    def isAnon(self):
        return self.name == 'anonymous'

    def __init__(self, user_name, first_name, last_name, country, email, password_hash = 'default_pass'):
        self.name = user_name
        self.first_name = first_name
        self.last_name = last_name
        self.country = country
        self.email = email
        self.password_hash = password_hash

    def find_user(user_name):
        return user('jo', 'Johannes', 'Kandler', 'DE', 'test@mail.com', 'password')

    def store(self):
        if user.isAnon : 
            print("ERROR: tried to save anon account")
        else:
            print(self.name)

    def update(self, new_user):
        print(new_user.name)

    def jsonify(self):
        return jsonify({
            'user': self.name,
            'email': self.email
        })

    def nameTaken(name):
        return name == 'jo'
