from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from goods.models import Product
from goods.serializers import ProductSerializer
from .models import Cart, CartItem
from .forms import CartAddProductForm

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import CartSerializer, CartItemSerializer
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


@api_view(['GET', 'DELETE', 'PUT'])
def api_cart(request, user_id):
    try:
        carts = Cart.objects.get(user_id=user_id)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    data = []
    next_page = 1
    previous_page = 1
    cart_item = CartItem.objects.filter(cart=carts)
    ser2 = CartItemSerializer(cart_item, context={'request': request}, many=True)
    print(ser2.data)
    # print(carts['items'])
    # page = request.GET.get('page', 1)
    # paginator = Paginator(carts, 10)
    # try:
    #     data = paginator.page(page)
    # except PageNotAnInteger:
    #     data = paginator.page(1)
    # except EmptyPage:
    #     data = paginator.page(paginator.num_pages)
    serializer = CartSerializer(carts, context={'request': request})
    return Response(serializer.data)

# @api_view(['POST'])
# def api_cart_add(request, prod_id):
#     cart = Cart(request)
#     product = get_object_or_404(Product, id=prod_id)
#     form = CartAddProductForm(request.POST)
#     if form.is_valid():
#         cd = form.cleaned_data
#         cart.add(product=product, quantity=cd['quantity'], update_quantity=cd['update'])
#     return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['GET', 'PUT', 'DELETE'])
# def customers_detail(request, pk):
#     try:
#         customer = CustomUser.objects.get(pk=pk)
#     except CustomUser.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         print("gettt ", pk)
#         serializer = CustomUserSerializer(customer, context={'request': request})
#         print(serializer.data)
#         return Response(serializer.data)
#
#     elif request.method == 'PUT':
#         serializer = CustomUserSerializer(customer, data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     elif request.method == 'DELETE':
#         customer.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
