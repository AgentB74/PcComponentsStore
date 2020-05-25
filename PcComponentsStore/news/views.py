from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from cart.forms import CartAddProductForm
from django.shortcuts import render, get_object_or_404
from .models import News
from .serializers import NewsSerializer


# Create your views here.
@api_view(['GET'])
def api_news_list(request):
    data = []
    next_page = 1
    previous_page = 1
    news = News.objects.all()
    page = request.GET.get('page', 1)
    paginator = Paginator(news, 10)
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)

    serializer = NewsSerializer(data, context={'request': request}, many=True)
    print(serializer.data)
    return Response(serializer.data)
