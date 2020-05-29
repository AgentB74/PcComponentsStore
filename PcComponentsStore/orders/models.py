from django.db import models
from goods.models import Product
from users.models import CustomUser


class Order(models.Model):
    user = models.ForeignKey(CustomUser, related_name='order', on_delete=models.CASCADE)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    paid = models.BooleanField(default=False)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return 'Order {}'.format(self.id)

    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())

    @classmethod
    def create(cls, user, total_cost):
        order = cls(user=user, total_cost=total_cost)
        return order


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return '{}'.format(self.id)

    def get_cost(self):
        return self.price * self.quantity

    @classmethod
    def create(cls, order, product, price, quantity):
        order_item = cls(order=order, product=product, price=price, quantity=quantity)
        return order_item


class Status(models.Model):
    status = models.CharField(max_length=50, db_index=True)

    class Meta:
        ordering = ('status',)

    def __str__(self):
        return self.status


class OrderStatus(models.Model):
    order = models.ForeignKey(Order, related_name='order_status', on_delete=models.CASCADE)
    ord_status = models.ForeignKey(Status, related_name='ord_status', on_delete=models.CASCADE)
    order_status_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('order', 'order_status_date', 'ord_status'),)

    @classmethod
    def create(cls, order, ord_status):
        order_item = cls(order=order, ord_status=ord_status)
        return order_item
