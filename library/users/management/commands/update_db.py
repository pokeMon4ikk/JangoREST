import os, json
from django.core.management.base import BaseCommand
from authors.models import Author
from users.models import User

JSON_PATH = 'json'


def load_from_json(file_name):
    with open(os.path.join(JSON_PATH, file_name + '.json'), 'r', encoding='UTF-8') as file:
        return json.load(file)


class Command(BaseCommand):
    def handle(self, *args, **options):
        authors = load_from_json('authors')
        for author in authors:
            new_author = Author(**author)
            new_author.save()

        users = load_from_json('users')
        for user in users:
            new_user = User(**user)
            new_user.save()
