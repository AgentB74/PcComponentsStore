from rest_framework import serializers
from .models import News
from goods.serializers import ProductSerializer


class NewSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = News
        fields = ('id', 'product', 'description')
