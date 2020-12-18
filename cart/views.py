# from django.http import Http404
# from rest_framework.views import APIView
# from .models import Cart, CartItem
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import CartSerializer, CartItemSerializer, CartItemToAddSerializer, CartItemToChangeSerializer
# from goods.models import Product
#
#
# def cart_update(cart):
#     cart.update_total_cost()
#     cart.save()
#
#
# class CartDetail(APIView):
#     """
#     Retrieve, create, update or delete a cart instance.
#     """
#
#     def get_object(self, pk):
#         try:
#             return Cart.objects.get(pk=pk)
#         except Cart.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         cart = self.get_object(pk)
#         serializer = CartSerializer(cart, context={'request': request})
#         return Response(serializer.data)
#
#     def post(self, request, pk, format=None):
#         print('+'*100)
#         print(type(request.data))
#         print((request.data))
#         print('+'*100)
#
#         cart = self.get_object(pk)
#
#         new_item = {}
#         new_item.update({'cart': cart.id})
#         product_to_add = Product.objects.get(id=request.data.get('product'))
#         quantity = request.data.get('quantity')
#         price = product_to_add.price
#
#         new_item.update({'product': request.data.get('product')})
#         new_item.update({'quantity': quantity})
#         new_item.update({'price': price})
#         serializer = CartItemToAddSerializer(data=new_item)
#         if serializer.is_valid():
#             serializer.save()
#             cart_update(cart)
#             return Response(status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk, format=None):
#         cart = self.get_object(pk)
#         cart_item = CartItem.objects.filter(cart=cart)
#         cart_item.delete()
#         cart_update(cart)
#         return Response(status=status.HTTP_204_NO_CONTENT)
#
#
# class CartItemDetail(APIView):
#     """
#     Retrieve, update or delete a Cart Item instance.
#     """
#
#     def get_object(self, pk, cart_prod_pk):
#         try:
#             cart = Cart.objects.get(pk=pk)
#             cart_item = CartItem.objects.get(cart=cart, id=cart_prod_pk)
#             return cart_item, cart
#         except CartItem.DoesNotExist:
#             raise Http404
#         except Cart.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         cart_item, cart = self.get_object(pk, request.data.get('item'))
#         serializer = CartItemSerializer(cart_item, context={'request': request})
#         return Response(serializer.data)
#
#     def put(self, request, pk, format=None):
#         cart_item, cart = self.get_object(pk, request.data.get('item'))
#         serializer = CartItemToChangeSerializer(cart_item, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             cart_update(cart)
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk, format=None):
#         cart_item, cart = self.get_object(pk, request.data.get('item'))
#         cart_item.delete()
#         cart_update(cart)
#         return Response(status=status.HTTP_204_NO_CONTENT)
