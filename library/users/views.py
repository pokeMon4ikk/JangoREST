from rest_framework import mixins, viewsets
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(mixins.ListModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.CreateModelMixin,
                       viewsets.GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    filterset_fields = ['first_name', 'last_name', 'birthday_year', 'age', 'gender']
