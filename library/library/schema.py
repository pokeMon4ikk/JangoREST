import graphene
from graphene_django import DjangoObjectType
from authors.models import Author, Book
from users.models import User, UserMoreInfo
from ToDo.models import Project,TODO


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class UserMoreInfoType(DjangoObjectType):
    class Meta:
        model = UserMoreInfo
        fields = '__all__'


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = '__all__'


class BookType(DjangoObjectType):

    class Meta:
        model = Book
        fields = '__all__'


class Query(graphene.ObjectType):
    all_books = graphene.List(BookType)
    all_authors = graphene.List(AuthorType)
    all_users = graphene.List(UserType)
    all_users_more_info = graphene.List(UserMoreInfoType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)

    def resolve_all_books(root, info):
        return Book.objects.all()

    def resolve_all_authors(root, info):
        return Author.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_users_more_info(root, info):
        return UserMoreInfo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return TODO.objects.all()


schema = graphene.Schema(query=Query)
