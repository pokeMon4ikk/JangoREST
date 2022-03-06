from rest_framework import serializers
# from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Author, Biography, Article, Book


# class AuthorModelSerializer(HyperlinkedModelSerializer):
#     class Meta:
#         model = Author
#         fields = '__all__'


class AuthorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        exclude = ['uid']

    def create(self, validated_data):
        return Author(**validated_data)

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.birthday_year = validated_data.get('birthday_year', instance.birthday_year)
        return instance

    def validate_birthday_year(self, value):
        if value < 0:
            raise serializers.ValidationError('Год рождения не может быть отрицательным')
        return value


class BiographyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Biography
        fields = '__all__'


class ArticleModelSerializer(serializers.ModelSerializer):
    author = AuthorModelSerializer()

    class Meta:
        model = Article
        exclude = ['id']


class BookModelSerializer(serializers.ModelSerializer):
    authors = serializers.StringRelatedField(many=True)

    class Meta:
        model = Book
        fields = '__all__'



