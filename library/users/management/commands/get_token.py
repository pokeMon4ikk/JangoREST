import requests
from django.core.management import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **options):
        response = requests.post('http://127.0.0.1:8000/api-token-auth/', data={'username': 'pasha', 'password': '1358313583q'})
        print(response.status_code)
        print(response.json())
