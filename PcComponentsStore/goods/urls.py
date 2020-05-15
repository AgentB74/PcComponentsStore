from django.urls import path
# from .views import HomePageView, CustomersListView, ProductListView #, SearchView
from . import views

# urlpatterns = [
#     path('', HomePageView.as_view(), name='home'),
#     path('customers', CustomersListView.as_view(), name='customers'),
#     path('products', ProductListView.as_view(), name='products'),
#     # path('search', SearchView.as_view(), name='search'),
# ]

app_name = 'goods'

urlpatterns = [
    path('', views.product_list, name='product_list'),
    path('<slug:category_slug>/', views.product_list, name='product_list_by_category'),
    path('<int:id>/<slug:slug>/', views.product_detail, name='product_detail'),
]