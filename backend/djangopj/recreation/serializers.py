from rest_framework import serializers
from .models import ArtifactRecreation


class ArtifactRecreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtifactRecreation
        fields = ('__all__')
