from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from goods.models import Product
from goods.serializers import ProductSerializer
from .models import Cart, CartItem
from .forms import CartAddProductForm

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import CartSerializer, CartItemSerializer, CartItemSerializer2
from collections import OrderedDict


@require_POST
def cart_add(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    form = CartAddProductForm(request.POST)
    if form.is_valid():
        cd = form.cleaned_data
        cart.add(product=product, quantity=cd['quantity'], update_quantity=cd['update'])
    return redirect('cart:cart_detail')


def cart_remove(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    cart.remove(product)
    return redirect('cart:cart_detail')


def cart_detail(request):
    cart = Cart(request)
    for item in cart:
        item['update_quantity_form'] = CartAddProductForm(initial={'quantity': item['quantity'], 'update': True})
    return render(request, 'cart/detail.html', {'cart': cart})


def cart_update(cart):
    cart.update_total_cost()
    cart.save()


@api_view(['GET', 'DELETE'])
def api_cart(request, user_id):
    try:
        cart = Cart.objects.get(user_id=user_id)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # data = []
        # next_page = 1
        # previous_page = 1
        # print(carts['items'])
        # page = request.GET.get('page', 1)
        # paginator = Paginator(carts, 10)
        # try:
        #     data = paginator.page(page)
        # except PageNotAnInteger:
        #     data = paginator.page(1)
        # except EmptyPage:
        #     data = paginator.page(paginator.num_pages)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'DELETE':
        cart_item = CartItem.objects.filter(cart=cart)
        cart_item.delete()
        cart_update(cart)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'DELETE'])
def api_cart_good(request, user_id, cart_prod_id):
    try:
        cart = Cart.objects.get(user_id=user_id)
        cart_item = CartItem.objects.filter(cart=cart, id=cart_prod_id)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except CartItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CartItemSerializer(cart_item, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        cart_item.delete()
        cart_update(cart)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def api_cart_add_good(request, user_id):
    try:
        cart = Cart.objects.get(user_id=user_id)
        serializer = CartSerializer(cart, context={'request': request})
        print(serializer.data)
        # product = Product.objects.filter(id=prod_id)
        # serializer2 = ProductSerializer(product, context={'request': request}, many=True)
        # print(serializer2.data)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        serializer = CartItemSerializer2(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            cart_update(cart)
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
