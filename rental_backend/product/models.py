from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Product(BaseModel):
    code = models.CharField(max_length=100)
    name = models.CharField(max_length=120)
    type = models.CharField(max_length=100)
    availability = models.BooleanField(null=True, blank=True)
    needing_repair = models.BooleanField(null=True, blank=True)
    durability = models.FloatField(null=True, blank=True)
    max_durability = models.FloatField(null=True, blank=True)
    mileage = models.FloatField(null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    minimum_rent_period = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.name)


class Booking(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    booking_date = models.DateTimeField()

    def __str__(self):
        return str(self.product)


class Returning(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    booking_date = models.DateTimeField()
    returning_date = models.DateTimeField()
    used_mileage = models.FloatField(null=True, blank=True)
    total_cost = models.FloatField(null=True, blank=True)

    def __str__(self):
        return str(self.product)
