from django.db import models
from goods.models import Product
from orders.models import Order
from users.models import CustomUser


# Create your models here.
class Cart(models.Model):
    user = models.OneToOneField(CustomUser, related_name='cart', on_delete=models.CASCADE)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_empty = models.BooleanField(default=True)

    def __str__(self):
        return 'Cart {}'.format(self.id)

    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())

    def update_total_cost(self):
        self.total_cost = sum(item.get_cost() for item in self.items.all())

    @classmethod
    def create(cls, user):
        cart = cls(user=user)
        return cart


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='cart_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return '{}'.format(self.id)

    def get_cost(self):
        return self.price * self.quantity
