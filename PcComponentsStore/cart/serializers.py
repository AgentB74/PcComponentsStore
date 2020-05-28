from rest_framework import serializers
from .models import Cart, CartItem
from goods.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity', 'price')


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True, many=True)

    class Meta:
        model = Cart
        fields = ('id', 'user', 'items', 'total_cost', 'is_empty')
