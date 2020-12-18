# from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
# from django.http import Http404
# from rest_framework.request import Request
# from rest_framework.response import Response
# # from cart.forms import CartAddProductForm
# from rest_framework.views import APIView
#
# from .models import Category, Product
# from .serializers import ProductSerializer
#
#
# class GoodDetail(APIView):
#     """Retrieve, update or delete a good instance."""
#
#     def get_object(self, pk: int) -> Product:
#         """
#
#         Args:
#             pk:
#
#         Returns:
#
#         """
#
#         try:
#             product = Product.objects.get(id=pk)
#             return product
#         except Product.DoesNotExist:
#             raise Http404
#
#     def get(self, request: Request, prod_id: int) -> Response:
#         """
#
#         Args:
#             request:
#             prod_id:
#
#         Returns:
#
#         """
#
#         product = self.get_object(prod_id)
#         serializer = ProductSerializer(product, context={'request': request})
#         return Response(serializer.data)
#
#
# class GoodList(APIView):
#     """Retrieve, update or delete a snippet instance."""
#
#     def get_object(self, category_name: str) -> Category:
#         try:
#             category = Category.objects.get(slug=category_name)
#             return category
#         except Category.DoesNotExist:
#             raise Http404
#             # return Response(status=status.HTTP_404_NOT_FOUND)
#
#     def get(self, request, category_slug: str, format=None):
#         # data = []
#         # next_page = 1
#         # previous_page = 1
#
#         if category_slug == 'all':
#             products = Product.objects.all()
#             page = request.GET.get('page', 1)
#             paginator = Paginator(products, 10)
#             try:
#                 data = paginator.page(page)
#             except PageNotAnInteger:
#                 data = paginator.page(1)
#             except EmptyPage:
#                 data = paginator.page(paginator.num_pages)
#
#             serializer = ProductSerializer(data, context={'request': request}, many=True)
#             return Response(serializer.data)
#
#         else:
#             category = self.get_object(category_slug)
#             products = Product.objects.filter(category=category.id)
#             page = request.GET.get('page', 1)
#             paginator = Paginator(products, 10)
#
#             try:
#                 data = paginator.page(page)
#             except PageNotAnInteger:
#                 data = paginator.page(1)
#             except EmptyPage:
#                 data = paginator.page(paginator.num_pages)
#
#             serializer = ProductSerializer(data, context={'request': request}, many=True)
#             print(serializer.data)
#             return Response(serializer.data)
