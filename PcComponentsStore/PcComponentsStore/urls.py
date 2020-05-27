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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from basic import views
from users import views as user_views
from goods import views as goods_views
from cart import views as cart_views
from news import views as news_views

from django.conf.urls import url
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homeView),
    path('users/', include('users.urls')),
    path('users/', include('django.contrib.auth.urls')),
    url(r'^api/customers/$', user_views.customers_list),
    url(r'^api/customers/(?P<pk>[0-9]+)$', user_views.customers_detail),
    path('cart/', include('cart.urls')),
    path('orders/', include('orders.urls')),
    path('products/', include('goods.urls')),
    url(r'^favicon\.ico$', RedirectView.as_view(url='/static/img/favicon.ico'), name='favicon'),

    url(r'^api/products/$', goods_views.api_prod_list),
    url(r'^api/products/(?P<category_id>[0-9]+)$', goods_views.api_prod_list_by_category),
    url(r'^api/product/(?P<prod_id>[0-9]+)$', goods_views.api_prod_detail),

    url(r'^api/cart/(?P<user_id>[0-9]+)$', cart_views.api_cart),
    url(r'^api/news/$', news_views.api_news_list),

    # path('', HomeView.as_view(), name='home'),
    # path('about/', AboutView.as_view(), name='about'),
    # path('catalog/', CatalogView.as_view(), name='catalog'),
    # path('checkout/', CheckoutView.as_view(), name='checkout'),
    # path('order-summary/', OrderSummaryView.as_view(), name='order-summary'),
    # path('product/<slug>/', ItemDetailView.as_view(), name='product'),
    # path('add-to-cart/<slug>/', add_to_cart, name='add-to-cart'),
    # path('remove-from-cart/<slug>/', remove_from_cart, name='remove-from-cart'),
    # path('remove-item-from-cart/<slug>/', remove_single_item_from_cart,
    #      name='remove-single-item-from-cart'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
