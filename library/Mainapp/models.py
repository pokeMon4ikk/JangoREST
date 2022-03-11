from django.db import models


class User(models.Model):
    MALE = 'M'
    FEMALE = 'W'
    NONBINARY = 'X'

    GENDER_CHOICES = (
        (MALE, 'Мужчина'),
        (FEMALE, 'Женщина'),
        (NONBINARY, 'Небинарный')
    )

    first_name = models.CharField(verbose_name='Имя', max_length=256, blank=True)
    last_name = models.CharField(verbose_name='Фамилия', max_length=256, blank=True)
    birthday_year = models.PositiveIntegerField()
    gender = models.CharField(verbose_name='пол', max_length=1, choices=GENDER_CHOICES, blank=True)
    age = models.PositiveIntegerField(verbose_name='Возраст')

    def __str__(self):
        return self.first_name + '' + self.last_name

