from django.shortcuts import render
from .forms import OrderCreateForm

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from django.views.decorators.http import require_POST
from goods.models import Product
from goods.serializers import ProductSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from cart.serializers import CartSerializer, CartItemSerializer
from cart.models import Cart, CartItem
from cart.views import cart_update
from .models import Order, OrderItem, OrderStatus, Status
from .serualizers import OrderSerializer, OrderSerializer3


def order_create(request):
    cart = Cart(request)
    if request.method == 'POST':
        form = OrderCreateForm(request.POST)
        if form.is_valid():
            order = form.save()
            for item in cart:
                OrderItem.objects.create(order=order, product=item['product'], price=item['price'],
                                         quantity=item['quantity'])
            cart.clear()
        return render(request, 'orders/order/created.html', {'order': order})
    else:
        form = OrderCreateForm()
    return render(request, 'orders/order/create.html', {'cart': cart, 'form': form})


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


@api_view(['POST'])
def api_create_order(request, user_id):
    try:
        cart = Cart.objects.get(user_id=user_id)
        cart_item = CartItem.objects.filter(cart=cart)
        if len(cart_item) == 0:
            raise CartItem.DoesNotExist
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except CartItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        create_order(cart, cart_item)
        return Response(status=status.HTTP_201_CREATED)

