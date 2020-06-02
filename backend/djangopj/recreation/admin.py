from django.contrib import admin
from .models import Recreation
from .models import RecreationImage

# Register your models here.
admin.site.register(Recreation)
admin.site.register(RecreationImage)