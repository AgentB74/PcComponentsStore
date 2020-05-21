from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('pk', 'first_name', 'last_name', 'email', 'telephone_numb')

        # is_authenticated
