from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    telephone_numb = models.CharField(max_length=11, null=True, blank=True)
