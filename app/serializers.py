# backend/app/serializers.py

from rest_framework import serializers
from .models import Restaurant, Dish, Order, OrderItem

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['id', 'name', 'description', 'price', 'restaurant', 'category', 'image'] # NOVO

class RestaurantSerializer(serializers.ModelSerializer):
    dishes = DishSerializer(many=True, read_only=True)
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'description', 'address', 'delivery_time', 'image', 'dishes'] # NOVO

class OrderItemSerializer(serializers.ModelSerializer):
    dish_name = serializers.CharField(source='dish.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'dish', 'quantity', 'price', 'dish_name']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'status', 'created_at', 'total', 'items']