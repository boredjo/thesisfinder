from flask import jsonify

class idea:

    def __init__(self, title, tags, date, author, description):
        self.title = title
        self.tags = tags
        self.date = date
        self.author = author
        self.description = description
        self.claimed_by = []
        self.sponsorships = []
