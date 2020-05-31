import redis
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic

from django.views.generic import CreateView
from .forms import CustomUserCreationForm

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import CustomUser
from .serializers import *
from django.conf import settings
from cart.models import Cart


class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'signup.html'


# # Connect to our Redis instance
# redis_instance = redis.StrictRedis(host=settings.REDIS_HOST,
#                                    port=settings.REDIS_PORT, db=0)


@api_view(['GET', 'POST'])
def customers_list(request):
    if request.method == 'GET':
        data = []
        next_page = 1
        previous_page = 1
        customers = CustomUser.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(customers, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CustomUserSerializer(data, context={'request': request}, many=True)
        print(serializer.data)
        return Response(serializer.data)

        # if data.has_next():
        #     next_page = data.next_page_number()
        # if data.has_previous():
        #     previous_page = data.previous_page_number()
        #
        # return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
        #                  'nextlink': '/api/customers/?page=' + str(next_page),
        #                  'prevlink': '/api/customers/?page=' + str(previous_page)})

    elif request.method == 'POST':
        t1 = request.data[0].get('username')
        t2 = request.data[0].get('password')
        t3 = request.data[0].get('firstName')
        t4 = request.data[0].get('lastName')
        t5 = request.data[0].get('email')
        t6 = request.data[0].get('telephoneNumb')
        customer = CustomUser.create(t1, t2, t3, t4, t5, t6)
        customer.save()
        print(customer.id)

        serializer = CustomUserSerializer(data=customer)
        print(serializer.initial_data)
        cart = Cart.create(customer)
        # if serializer.is_valid():
        #     print(serializer.data)
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        cart.save()
        return Response(serializer.initial_data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def customers_detail(request, pk):
    try:
        customer = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        print("gettt ", pk)
        serializer = CustomUserSerializer(customer, context={'request': request})
        print(serializer.data)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CustomUserSerializer(customer, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
