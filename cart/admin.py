from django.contrib import admin
from .models import Cart, CartItem


# Register your models here.
class CartItemInline(admin.TabularInline):
    model = CartItem
    raw_id_fields = ['product']


# класс Inline позволяет включать модель в качестве подмодели в другую модель
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_cost']
    list_filter = ['user']
    inlines = [CartItemInline]
