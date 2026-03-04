from rest_framework import serializers
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Video
        fields = [
            "id",
            "title",
            "file",
            "is_public",
            "owner",
            "created_at",
        ]

    likes_count = serializers.ReadOnlyField()

    class Meta:
        model = Video
        fields = "__all__"