from django.contrib import admin
from .models import Order, OrderItem, OrderStatus, Status


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']


# класс Inline позволяет включать модель в качестве подмодели в другую модель

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'paid', 'created', 'updated']
    list_filter = ['paid', 'created', 'updated']
    inlines = [OrderItemInline]


@admin.register(OrderStatus)
class OrderStatusAdmin(admin.ModelAdmin):
    list_display = ['order', 'order_status_date', 'ord_status']
    list_filter = ['order_status_date', 'ord_status']


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ['id', 'status']
