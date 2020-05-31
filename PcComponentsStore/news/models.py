from django.db import models
from goods.models import Product


# Create your models here.
class News(models.Model):
    product = models.ForeignKey(Product, related_name='news', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)

