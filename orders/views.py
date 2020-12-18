# from django.http import Http404
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
#
# from .models import Order, OrderItem
#
#
# class OrderDetail(APIView):
#     """Retrieve, update or delete a snippet instance."""
#
#     def get_object(self, pk):
#         try:
#             order = Order.objects.get(pk=pk)
#             cart_item = OrderItem.objects.filter(order=order)
#             if len(cart_item) == 0:
#                 raise OrderItem.DoesNotExist
#         except Order.DoesNotExist:
#             raise Http404
#         except OrderItem.DoesNotExist:
#             raise Http404
#
#     # def get(self, request, pk, format=None):
#     #     snippet = self.get_object(pk)
#     #     serializer = SnippetSerializer(snippet)
#     #     return Response(serializer.data)
#     #
#     # def put(self, request, pk, format=None):
#     #     snippet = self.get_object(pk)
#     #     serializer = SnippetSerializer(snippet, data=request.data)
#     #     if serializer.is_valid():
#     #         serializer.save()
#     #         return Response(serializer.data)
#     #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     #
#     # def delete(self, request, pk, format=None):
#     #     snippet = self.get_object(pk)
#     #     snippet.delete()
#     #     return Response(status=status.HTTP_204_NO_CONTENT)
#
#
# class OrderList(APIView):
#     """
#     List all snippets, or create a new snippet.
#     """
#
#     def get(self, request, format=None):
#         orders = Order.objects.all()
#         serializer = SnippetSerializer(snippets, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, format=None):
#         serializer = SnippetSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# # def api_create_order(request, user_id):
# #     try:
# #         cart = Cart.objects.get(user_id=user_id)
# #         cart_item = CartItem.objects.filter(cart=cart)
# #         if len(cart_item) == 0:
# #             raise CartItem.DoesNotExist
# #     except Cart.DoesNotExist:
# #         return Response(status=status.HTTP_404_NOT_FOUND)
# #     except CartItem.DoesNotExist:
# #         return Response(status=status.HTTP_404_NOT_FOUND)
# #
# #     if request.method == 'POST':
# #         order = create_order(cart, cart_item)
# #         return Response(order.id, status=status.HTTP_201_CREATED)
