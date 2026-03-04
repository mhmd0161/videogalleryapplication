from django.contrib import admin
from .models import Video

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "owner", "is_public", "created_at")
    list_filter = ("is_public", "created_at")
    search_fields = ("title", "owner__username")