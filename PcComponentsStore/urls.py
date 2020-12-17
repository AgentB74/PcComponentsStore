"""PcComponentsStore URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from basic import views
from users import views as user_views, endpoints
from goods import views as goods_views
from news import views as news_views
from orders import views as orders_views
from cart import views as test_v

from django.conf.urls import url
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.IndexView.as_view()),
    path('users/', include('users.urls')),
    path('users/', include('django.contrib.auth.urls')),

    # url(r'^api/users/$', user_views.current_user),
    url(r'^api/', include(endpoints)),
    url(r'^api/auth/', include('knox.urls')),

    url(r'^api/customers/$', user_views.customers_list),
    url(r'^api/customers/(?P<pk>[0-9]+)$', user_views.customers_detail),
    # url(r'^api/customers/authorize/$', user_views.customer),
    path('api/cart/', include('cart.urls')),
    # path('orders/', include('orders.urls')),
    path('products/', include('goods.urls')),
    url(r'^favicon\.ico$', RedirectView.as_view(url='/static/img/favicon.ico'), name='favicon'),

    re_path(r'^api/product/(?P<prod_id>[0-9]+)$', goods_views.GoodDetail.as_view()),
    re_path(r'^api/products/(?P<category>[\w\-]+)$', goods_views.GoodList.as_view()),

    re_path(r'^api/order/create/(?P<user_id>[0-9]+)$', orders_views.OrderDetail.as_view()),

    url(r'api/cart/add/(?P<pk>[0-9]+)$', test_v.CartDetail.as_view()),

    url(r'^api/news/$', news_views.NewsList.as_view()),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
