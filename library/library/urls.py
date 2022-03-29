from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from authors.views import AuthorModelViewSet, BiographyModelViewSet, ArticleModelViewSet, BookModelViewSet
from ToDo.views import ProjectModelViewSet, TODOModelViewSet
from users.views import UserModelViewSet


router = DefaultRouter()
router.register('authors', AuthorModelViewSet)
router.register('biographies', BiographyModelViewSet)
router.register('articles', ArticleModelViewSet)
router.register('books', BookModelViewSet)
router.register('project', ProjectModelViewSet)
router.register('toDo', TODOModelViewSet)
router.register('user', UserModelViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]
