from rest_framework import permissions
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Author, Biography, Book, Article
from .serializers import AuthorModelSerializer, BiographyModelSerializer, ArticleModelSerializer, BookModelSerializer, \
    BookModelSerializerBase


class AuthorModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
    filterset_fields = ['first_name', 'last_name']


class BiographyModelViewSet(ModelViewSet):
    queryset = Biography.objects.all()
    serializer_class = BiographyModelSerializer
    permission_classes = [permissions.IsAuthenticated]


class ArticleModelViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleModelSerializer


class BookModelViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookModelSerializer

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return BookModelSerializer
        return BookModelSerializerBase
