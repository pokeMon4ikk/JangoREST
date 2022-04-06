from rest_framework import mixins, viewsets, generics
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet

from .models import User, UserMoreInfo
from .serializers import UserModelSerializer, UserVersionSerializer, UserMoreInfoSerializer


class UserModelViewSet(generics.ListAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    filterset_fields = ['first_name', 'last_name', 'birthday_year', 'age', 'gender']

    def get_serializer_class(self):
        if self.request.version == '2':
            return UserVersionSerializer
        return UserModelSerializer


class UserMoreInfoModelViewSet(ModelViewSet):
    queryset = UserMoreInfo.objects.all()
    serializer_class = UserMoreInfoSerializer
