from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from .views import RestaurantViewSet, DishViewSet, OrderViewSet, OrderItemViewSet

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)
router.register(r'orders', OrderViewSet)

restaurants_router = routers.NestedSimpleRouter(router, r'restaurants', lookup='restaurant')
restaurants_router.register(r'dishes', DishViewSet, basename='restaurant-dishes')

orders_router = routers.NestedSimpleRouter(router, r'orders', lookup='order')
orders_router.register(r'items', OrderItemViewSet, basename='order-items')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(restaurants_router.urls)),
    path('', include(orders_router.urls)),
]