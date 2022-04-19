from .models import User, UserMoreInfo
from rest_framework import serializers


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name',)


class UserMoreInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMoreInfo
        fields = '__all__'

