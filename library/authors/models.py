from django.db import models
from uuid import uuid4


class Author(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()

    def __str__(self):
        return self.first_name + " " + self.last_name


class Biography(models.Model):
    text = models.TextField()
    author = models.OneToOneField(Author, on_delete=models.CASCADE)


class Book(models.Model):
    name = models.CharField(max_length=32)
    authors = models.OneToOneField(Author, on_delete=models.CASCADE)


class Article(models.Model):
    name = models.CharField(max_length=32)
    author = models.ForeignKey(Author, models.PROTECT)
