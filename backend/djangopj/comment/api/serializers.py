from rest_framework import serializers
from comment.models import Comment
from django.conf import settings

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id','userID','artifactID','recrerationID','content','date')

class CommentDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userID.username', read_only=True)
    class Meta:
        model = Comment
        fields = ('id', 'userID','username','artifactID','recreationID','content','date')


    #     class TaskSerializer(serializers.ModelSerializer):
    #  id = serializers.ReadOnlyField()
    #  count_assigned = serializers.SerializerMethodField()
    #  count_completed = serializers.SerializerMethodField()

    #  class Meta:
    #      model = Task
    #      fields = ('id', 'label', 'count_assigned', 'count_completed')

    # def get_count_assigned(self, obj):
    #     return obj.assignees.count()

    # def get_count_completed(self, obj):
    #     return obj.assignees.exclude(completed__isnull=True).count()