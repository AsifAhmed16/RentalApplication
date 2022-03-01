from datetime import datetime

from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.exceptions import APIException
from rest_framework import status
from rest_framework.response import Response

from .models import *
from .serializers import *


class ProductListView(APIView):
    def get(self, *args, **kwargs):
        try:
            snippet = Product.objects.all().order_by('id')
            serializer = ProductSerializer(snippet, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as exc:
            raise APIException(detail=exc)


class ProductAddView(APIView):
    def post(self, *args, **kwargs):
        try:
            serializer = ProductSerializer(data=self.request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as exc:
            raise APIException(detail=exc)


class ProductDeleteView(APIView):
    def delete(self, *args, **kwargs):
        try:
            obj_to_delete = Product.objects.get(id=kwargs['product_id'])
            obj_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as exc:
            raise APIException(detail=exc)


class ProductDetailsView(APIView):
    def get(self, *args, **kwargs):
        try:
            snippet = get_object_or_404(Product, id=kwargs['product_id'])
            serializer = ProductSerializer(snippet)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as exc:
            raise APIException(detail=exc)


class ProductUpdateView(APIView):
    def put(self, *args, **kwargs):
        try:
            snippet = get_object_or_404(Product, id=kwargs['product_id'])
            serializer = ProductSerializer(snippet, data=self.request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as exc:
            raise APIException(detail=exc)


class ProductBookCostView(APIView):
    def post(self, *args, **kwargs):
        try:
            data = self.request.data.copy()
            snippet = get_object_or_404(Product, id=kwargs['product_id'])
            start_date = data['start_date']
            end_date = data['end_date']
            start_date = datetime.strptime(start_date, '%Y-%m-%d')
            end_date = datetime.strptime(end_date, '%Y-%m-%d')
            no_of_days = (end_date-start_date).days
            estimated_cost = str(no_of_days*snippet.price)
            return Response({'estimated_cost': estimated_cost}, status=status.HTTP_200_OK)
        except Exception as exc:
            raise APIException(detail=exc)


class ProductBookView(APIView):
    def post(self, *args, **kwargs):
        try:
            snippet = get_object_or_404(Product, id=kwargs['product_id'])
            request_data = self.request.data.copy()
            start_date = request_data['start_date']
            start_date = datetime.strptime(start_date, '%Y-%m-%d')
            data = {
                'product': snippet.id,
                'booking_date': start_date
            }
            serializer = BookingSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                Product.objects.filter(id=kwargs['product_id']).update(availability=False)
                return Response("", status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as exc:
            raise APIException(detail=exc)


class ProductReturnCostView(APIView):
    def post(self, *args, **kwargs):
        try:
            data = self.request.data.copy()
            snippet = get_object_or_404(Product, id=kwargs['product_id'])
            start_date = data['start_date']
            end_date = data['end_date']
            start_date = datetime.strptime(start_date, '%Y-%m-%d')
            end_date = datetime.strptime(end_date, '%Y-%m-%d')
            no_of_days = (end_date-start_date).days
            total_cost = str(no_of_days*snippet.price)
            return Response({'total_cost': total_cost}, status=status.HTTP_200_OK)
        except Exception as exc:
            raise APIException(detail=exc)


class ProductReturnView(APIView):
    def post(self, *args, **kwargs):
        try:
            snippet = get_object_or_404(Product, id=kwargs['product_id'])
            request_data = self.request.data.copy()
            start_date = request_data['start_date']
            end_date = request_data['end_date']
            used_mileage = request_data['used_mileage']
            booking_date = datetime.strptime(start_date, '%Y-%m-%d')
            returning_date = datetime.strptime(end_date, '%Y-%m-%d')
            no_of_days = (returning_date - booking_date).days
            total_cost = str(no_of_days * snippet.price)
            data = {
                'product': snippet.id,
                'booking_date': booking_date,
                'returning_date': returning_date,
                'used_mileage': used_mileage,
                'total_cost': total_cost,
            }
            serializer = ReturningSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                Product.objects.filter(id=kwargs['product_id']).update(availability=True)
                return Response("", status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as exc:
            raise APIException(detail=exc)
