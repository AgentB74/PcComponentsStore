import redis
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic

from django.views.generic import CreateView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

from .forms import CustomUserCreationForm

from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import CustomUser
from .serializers import *
from django.conf import settings
from cart.models import Cart

# NEW+++++++
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from knox.models import AuthToken

from .models import CustomUser
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer


class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'signup.html'


# class LoginAPI(generics.GenericAPIView):
#     serializer_class = LoginUserSerializer
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         return Response({
#             "user": UserSerializer(user, context=self.get_serializer_context()).data,
#             "token": AuthToken.objects.create(user)
#         })


# class RegistrationAPI(generics.GenericAPIView):
#     serializer_class = CreateUserSerializer
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#             "user": UserSerializer(user, context=self.get_serializer_context()).data,
#             "token": AuthToken.objects.create(user)
#         })


# тест
# @api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
# def example_view(request, format=None):
#     content = {
#         'user': unicode(request.user),  # `django.contrib.auth.User` instance.
#         'auth': unicode(request.auth),  # None
#     }
#     return Response(content)


# ==================================================================
# class RegistrationAPIView(APIView):
#     """
#     Registers a new user.
#     """
#     permission_classes = [AllowAny]
#     serializer_class = RegistrationSerializer
#
#     def post(self, request):
#         """
#         Creates a new User object.
#         Username, email, and password are required.
#         Returns a JSON web token.
#         """
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#
#         return Response(
#             {
#                 'token': serializer.data.get('token', None),
#             },
#             status=status.HTTP_201_CREATED,
#         )
#
#
# class LoginAPIView(APIView):
#     """
#     Logs in an existing user.
#     """
#     permission_classes = [AllowAny]
#     serializer_class = LoginSerializer
#
#     def post(self, request):
#         """
#         Checks is user exists.
#         Email and password are required.
#         Returns a JSON web token.
#         """
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#
# @api_view(['GET'])
# def current_user(request):
#     """
#     Determine the current user by their token, and return their data
#     """
#     print("GET")
#     serializer = CustomUserSerializer(request.user)
#     print("GET")
#     return Response(serializer.data)


# # Connect to our Redis instance
# redis_instance = redis.StrictRedis(host=settings.REDIS_HOST,
#                                    port=settings.REDIS_PORT, db=0)


@api_view(['GET'])
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
