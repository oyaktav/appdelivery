from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    address = models.CharField(max_length=255, blank=True, null=True) 
    delivery_time = models.IntegerField(default=30) 
    image = models.URLField(max_length=500, blank=True, null=True) 

    def __str__(self):
        return self.name

class Dish(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='dishes')
    category = models.CharField(max_length=100, default='Outros') 
    image = models.URLField(max_length=500, blank=True, null=True) 
    def __str__(self):
        return f'{self.name} ({self.restaurant.name})'

class Order(models.Model):
    STATUS_CHOICES = [
        ('P', 'Pendente'),
        ('C', 'Completo'),
    ]
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    created_at = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)

    def __str__(self):
        return f'Order #{self.id}'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f'{self.quantity}x {self.dish.name}'