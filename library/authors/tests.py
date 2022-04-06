from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import AuthorModelViewSet
from .models import Author, Book


class TestAuthorViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors/')
        view = AuthorModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/',
                               {'first_name': 'Александр', 'last_name': 'Пушкин', 'birthday_year': 1799}, format='json')
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/',
                               {'first_name': 'Александр', 'last_name': 'Пушкин', 'birthday_year': 1799}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        author = Author.objects.create(first_name='Александр', last_name='Пушкин', birthday_year=1799)
        client = APIClient()
        response = client.get(f'/api/authors/{author.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        author = Author.objects.create(first_name='Александр', last_name='Пушкин', birthday_year=1799)
        client = APIClient()
        response = client.put(f'/api/authors/{author.uid}/',
                              {'first_name': 'Александр', 'last_name': 'Блок', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        author = Author.objects.create(first_name='Александр', last_name='Пушкин', birthday_year=1799)
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/authors/{author.uid}/',
                              {'first_name': 'Александр', 'last_name': 'Блок', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        author = Author.objects.get(uid=author.uid)
        self.assertEqual(author.first_name, 'Александр')
        self.assertEqual(author.last_name, 'Блок')
        self.assertEqual(author.birthday_year, 1880)
        client.logout()


class TestBookViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/books/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        authors = Author.objects.create(first_name='Александр', last_name='Пушкин', birthday_year=1799)
        book = Book.objects.create(name='Пиковая дама', authors=authors)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/books/{book.id}/', {'name': 'Руслан и Людмила', 'author': book.authors.uid})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        book = Book.objects.get(id=book.id)
        self.assertEqual(book.name, 'Руслан и Людмила')

    def test_edit_mixer(self):
        book = mixer.blend(Book)
        admin = User.objects.create_superuser('admin', 'admin@admin.com','admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/books/{book.id}/', {'name': 'Руслан и Людмила', 'author': book.authors.uid})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        book = Book.objects.get(id=book.id)
        self.assertEqual(book.name, 'Руслан и Людмила')