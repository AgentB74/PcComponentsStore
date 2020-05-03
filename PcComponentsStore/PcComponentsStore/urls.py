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
from basic import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homeView),
    path('users/', include('users.urls')),
    path('users/', include('django.contrib.auth.urls')),

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
