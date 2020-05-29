from rest_framework import serializers
from .models import Order, OrderItem, OrderStatus
from goods.serializers import ProductSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ('id', 'order', 'product', 'quantity', 'price')


class OrderItemSerializer2(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('id', 'order', 'product', 'quantity', 'price')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'items', 'total_cost', 'created', 'updated', 'order_status')


class OrderSerializer2(serializers.ModelSerializer):
    items = OrderItemSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'items', 'total_cost', 'order_status')


class OrderSerializer3(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('user', 'total_cost')


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ('id', 'status')


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ('id', 'order', 'order_date', 'status_id')
