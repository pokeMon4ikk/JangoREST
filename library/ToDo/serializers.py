from .models import Project, TODO
from rest_framework import serializers


class ProjectModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        # exclude = ['uid']
        fields = '__all__'


class TODOModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
