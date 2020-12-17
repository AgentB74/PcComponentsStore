from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import News
from .serializers import NewSerializer


class NewsList(APIView):
    """
    List all news, or create a new.
    """

    def get(self, request, format=None):
        news = News.objects.all()
        serializer = NewSerializer(news, context={'request': request}, many = True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
