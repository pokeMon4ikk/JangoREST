from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, ViewSet
from .models import TODO, Project
from .serializers import ProjectModelSerializer, TODOModelSerializer


class ArticleLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_fields = ['name']
    pagination_class = ArticleLimitOffsetPagination


class ArticleLimitOffsetPagination2(LimitOffsetPagination):
    default_limit = 20


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    filterset_fields = ['name', 'author']
    pagination_class = ArticleLimitOffsetPagination2










