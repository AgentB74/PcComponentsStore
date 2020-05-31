from rest_framework import serializers
from .models import News
from goods.serializers import ProductSerializer


class NewsSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = News
        fields = ('id', 'product', 'description')
