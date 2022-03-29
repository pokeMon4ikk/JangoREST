from rest_framework import serializers
# from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.relations import StringRelatedField

from .models import Author, Biography, Article, Book


# class AuthorModelSerializer(HyperlinkedModelSerializer):
#     class Meta:
#         model = Author
#         fields = '__all__'


class AuthorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        exclude = ['uid']


class BiographyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Biography
        fields = '__all__'


class ArticleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        exclude = ['id']


class BookModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'



