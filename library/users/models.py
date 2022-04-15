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
    age = models.PositiveIntegerField(verbose_name='Возраст', blank=True)

    def __str__(self):
        return self.first_name + '' + self.last_name


class UserMoreInfo(models.Model):
    SPORT = 'Спорт'
    ART = 'Искусство'
    MUSIC = 'Музыка'
    DANCE = 'Танцы'
    COLLECTING = 'Коллекционирование'
    IT = 'IT'
    BOOKS = 'Книги'
    EMBROIDERY = 'Вышивание'
    SELF_DEVELOPMENT = 'Саморазвитие'
    TRAVELLING = 'Путешествие'
    OTHER = 'Другое'

    HOBBY_CHOICES = (
        (SPORT, 'Спорт'),
        (ART, 'Искусство'),
        (MUSIC, 'Музыка'),
        (DANCE, 'Танцы'),
        (COLLECTING, 'Коллекционирование'),
        (IT, 'IT'),
        (BOOKS, 'Книги'),
        (EMBROIDERY, 'Вышивание'),
        (SELF_DEVELOPMENT, 'Саморазвитие'),
        (TRAVELLING, 'Путешествие'),
        (OTHER, 'Другое'),
    )

    LOW = 'Low'
    AVERAGE = 'Average'
    BIG = 'Big'

    SALARY_CHOICES = (
        (LOW, '10-50 тысяч'),
        (AVERAGE, '50-120 тысяч'),
        (BIG, '120+ тысяч'),
    )

    user = models.ForeignKey(User, verbose_name="Пользователь", on_delete=models.CASCADE)
    hobby = models.CharField(verbose_name='Хобби', max_length=128, choices=HOBBY_CHOICES, blank=True)
    spouse_name = models.CharField(verbose_name='Имя супруга', max_length=128, blank=True)
    work = models.CharField(verbose_name='Работа', max_length=128, blank=True)
    work_description = models.TextField(verbose_name='Описание работы', blank=True)
    salary_level = models.CharField(verbose_name='Уровень зарплаты', max_length=128, choices=SALARY_CHOICES, blank=True)



