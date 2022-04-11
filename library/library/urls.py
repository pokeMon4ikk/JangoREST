from django.contrib import admin
from django.urls import path, include, re_path
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from authors.views import AuthorModelViewSet, BiographyModelViewSet, ArticleModelViewSet, BookModelViewSet
from ToDo.views import ProjectModelViewSet, TODOModelViewSet
from users.views import UserModelViewSet, UserMoreInfoModelViewSet
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
router.register('authors', AuthorModelViewSet)
router.register('biographies', BiographyModelViewSet)
router.register('articles', ArticleModelViewSet)
router.register('books', BookModelViewSet)
router.register('project', ProjectModelViewSet)
router.register('toDo', TODOModelViewSet)
router.register('userinfo', UserMoreInfoModelViewSet)
# router.register('user', UserModelViewSet)


schema_view = get_schema_view(
    openapi.Info(
        title="Library",
        default_version='1',
        description="Документация",
        contact=openapi.Contact(email="admin@admin.ru"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
    re_path(r'^api/(?P<version>\d)/user/$', UserModelViewSet.as_view()),
    # path('api/users/1/', include('users.urls', namespace='1')),
    # path('api/users/2/', include('users.urls', namespace='2'))
    # path('api/users/', UserModelViewSet.as_view())

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]
