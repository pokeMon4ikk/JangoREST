from django.db import models
from uuid import uuid4


class TODO(models.Model):
    name = models.CharField(verbose_name='Название заметки', max_length=256, blank=True)
    text = models.TextField(verbose_name='Текст заметки', blank=True)
    created_at = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='Дата обновления', auto_now=True)
    is_active = models.BooleanField(verbose_name='активна', default=True)
    author = models.CharField(verbose_name='Автор заметки', max_length=256, blank=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4, auto_created=True, serialize=False)
    name = models.CharField(verbose_name='Название проекта', max_length=256)
    description = models.TextField(verbose_name='Описание проекта', blank=True)
    link_to_repo = models.URLField(verbose_name='Ссылка на репозиторий проекта', blank=True)
    devs = models.TextField(verbose_name='Разработчики', blank=True)
    Todo = models.ForeignKey(TODO,  models.PROTECT, verbose_name='Заметка')

    def __str__(self):
        return self.name
