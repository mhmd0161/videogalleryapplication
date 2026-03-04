from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from gallery.views import VideoViewSet
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'videos', VideoViewSet)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("", lambda r: HttpResponse("API running")),
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),

    # Auth
    path("api/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # your other routes...
]

from gallery.auth_views import signup

urlpatterns = [
    path("api/auth/signup/", signup),
]

from gallery.views import signup
urlpatterns = [
    path("api/signup/", signup),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
