from cart.views import cart_update
from .models import Order, OrderItem, OrderStatus, Status
from .serializers import OrderSerializer3


def create_order_status(ord_id):
    ord_status = Status.objects.get(id=1)
    order_status = OrderStatus.create(ord_id, ord_status)
    order_status.save()


def create_order_item(cart_item, ord_id):
    order_item = OrderItem.create(ord_id, cart_item.product, cart_item.price, cart_item.quantity)
    order_item.save()


def create_order(cart, cart_item):
    order = Order.create(cart.user, cart.get_total_cost())
    order.save()

    ord_serializer = OrderSerializer3(data=order)
    if ord_serializer.is_valid():
        print(ord_serializer.data)
    for item in cart_item:
        create_order_item(item, order)

    create_order_status(order)
    cart_item.delete()
    cart_update(cart)
    return order
