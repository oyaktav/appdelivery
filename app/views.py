from rest_framework import viewsets
from .models import Restaurant, Dish, Order, OrderItem
from .serializers import RestaurantSerializer, DishSerializer, OrderSerializer, OrderItemSerializer

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class DishViewSet(viewsets.ModelViewSet):
    serializer_class = DishSerializer

    def get_queryset(self):
        restaurant_id = self.kwargs['restaurant_id']
        return Dish.objects.filter(restaurant=restaurant_id)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer