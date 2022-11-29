from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Car

class ListUser(APIView):
    def get(self, request, format=None):
        print(request)
        print(self)
        return Response('Hello')