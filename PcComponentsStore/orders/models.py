from django.db import models
from goods.models import Product
from users.models import CustomUser


class Order(models.Model):
    user = models.ForeignKey(CustomUser, related_name='order', on_delete=models.CASCADE)
    # first_name = models.CharField(max_length=50)
    # last_name = models.CharField(max_length=50)
    # email = models.EmailField()
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


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return '{}'.format(self.id)

    def get_cost(self):
        return self.price * self.quantity


class Status(models.Model):
    status = models.CharField(max_length=50)


class OrderStatus(models.Model):
    order = models.ForeignKey(Order, related_name='order_status', on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    status_id = models.ForeignKey(Status, related_name='ord_status', on_delete=models.CASCADE)

    class Meta:
        unique_together = (('order', 'order_date', 'status_id'),)
