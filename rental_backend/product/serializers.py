from rest_framework import serializers

from .models import Product, Booking, Returning


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = '__all__'


class ReturningSerializer(serializers.ModelSerializer):

    class Meta:
        model = Returning
        fields = '__all__'
