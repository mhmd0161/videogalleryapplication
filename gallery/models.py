from django.db import models
from django.contrib.auth.models import User


class Video(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="videos"
    )

    title = models.CharField(max_length=255)

    file = models.FileField(
        upload_to="videos/",
        null=False,
        blank=False
    )

    is_public = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    # 📊 Stats
    views = models.PositiveIntegerField(default=0)

    likes = models.ManyToManyField(
        User,
        related_name="liked_videos",
        blank=True
    )

    def __str__(self):
        return f"{self.title} ({self.owner.username})"

    @property
    def likes_count(self):
        return self.likes.count()

    class Meta:
        ordering = ["-created_at"]