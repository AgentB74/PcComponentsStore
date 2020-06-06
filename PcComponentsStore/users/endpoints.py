from django.db import router
from django.urls import path, re_path, include
from django.conf.urls import url


# from users.views import SignUpView, RegistrationAPIView, LoginAPIView
from users.api import RegistrationAPI, LoginAPI, UserAPI

urlpatterns = [
    # path('signup/', SignUpView.as_view(), name='signup'),
    # re_path(r'^MyRegistration/?$', RegistrationAPIView.as_view(), name='user_registration'),
    # re_path(r'^MyLogin/?$', LoginAPIView.as_view(), name='user_login'),
    # url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
]