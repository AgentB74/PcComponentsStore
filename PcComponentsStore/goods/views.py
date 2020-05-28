from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from cart.forms import CartAddProductForm
from django.shortcuts import render, get_object_or_404
from .models import Category, Product
from .serializers import ProductSerializer, CategorySerializer


@api_view(['GET'])
def api_prod_list(request):
    data = []
    next_page = 1
    previous_page = 1
    products = Product.objects.all()
    page = request.GET.get('page', 1)
    paginator = Paginator(products, 10)
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)

    serializer = ProductSerializer(data, context={'request': request}, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def api_prod_list_by_category(request, category_id):
    try:
        # print(Category.objects.get(id=category_id))
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        # serializer = CategorySerializer(category, context={'request': request})
        # print(serializer.data)
        page = request.GET.get('page', 1)
        products = Product.objects.filter(available=True)
        print("products == ", products)
        category = get_object_or_404(Category, id=category_id)
        print("categ == ", category.id)
        products = products.filter(category=category.id)
        print("products == ", products)

        paginator = Paginator(products, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ProductSerializer(data, context={'request': request}, many=True)
        print(serializer.data)
        return Response(serializer.data)


@api_view(['GET'])
def api_prod_detail(request, prod_id):
    products = Product.objects.filter(available=True)
    product = products.filter(id=prod_id)

    serializer = ProductSerializer(product, context={'request': request}, many=True)
    print(serializer.data)
    return Response(serializer.data)


def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
    return render(request, 'goods/product/list.html',
                  {'category': category, 'categories': categories, 'products': products})


def product_detail(request, id, slug):
    product = get_object_or_404(Product, id=id, slug=slug, available=True)
    cart_product_form = CartAddProductForm()
    return render(request, 'goods/product/detail.html', {'product': product, 'cart_product_form': cart_product_form})
