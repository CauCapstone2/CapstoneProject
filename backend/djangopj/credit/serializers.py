from rest_framework import serializers
from home.models import Profile

class CreditSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Profile
        fields = ('user', 'credit',)