from django.db.models import F
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from .models import Video
from .serializers import VideoSerializer


class VideoViewSet(ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    # ✅ LIKE SYSTEM (1 like per user)
    @action(detail=True, methods=["POST"], permission_classes=[IsAuthenticated])
    def like(self, request, pk=None):
        video = self.get_object()

        # more efficient than "in video.likes.all()"
        if video.likes.filter(id=request.user.id).exists():
            video.likes.remove(request.user)
            return Response({"liked": False})

        video.likes.add(request.user)
        return Response({"liked": True})


    # ✅ VIEW COUNTER (only when frontend calls it)
    @action(detail=True, methods=["POST"], permission_classes=[AllowAny])
    def view(self, request, pk=None):
        Video.objects.filter(pk=pk).update(views=F("views") + 1)

        # return updated count (useful for frontend)
        video = Video.objects.get(pk=pk)
        return Response({
            "status": "view counted",
            "views": video.views
        })


    # ✅ PERMISSIONS
    def get_permissions(self):
        if self.action in ["list", "retrieve", "view"]:
            return [AllowAny()]
        return [IsAuthenticated()]


    # ✅ QUERYSET LOGIC
    def get_queryset(self):
        user = self.request.user

        # Only owner can update/delete
        if self.action in ["destroy", "update", "partial_update"]:
            return Video.objects.filter(owner=user)

        # Logged-in users see public + their own
        if user.is_authenticated:
            return (
                Video.objects.filter(is_public=True) |
                Video.objects.filter(owner=user)
            ).distinct()

        # Guests see public only
        return Video.objects.filter(is_public=True)


    # ✅ OWNER ON CREATE
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    # ✅ MY VIDEOS
    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def mine(self, request):
        videos = Video.objects.filter(owner=request.user)
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)


# ✅ SIGNUP FUNCTION
@api_view(["POST"])
def signup(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    User.objects.create_user(username=username, password=password)

    return Response(
        {"message": "User created successfully"},
        status=status.HTTP_201_CREATED
    )