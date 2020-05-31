from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    telephone_numb = models.CharField(max_length=12, null=True, blank=True)

    @classmethod
    def create(cls, username, password, first_name, last_name, email, telephone_numb):
        user = cls(username=username, password=password, first_name=first_name, last_name=last_name, email=email,
                   telephone_numb=telephone_numb)
        return user
