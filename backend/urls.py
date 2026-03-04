from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from gallery.views import VideoViewSet, signup
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'videos', VideoViewSet, basename='video')

urlpatterns = [
    # ADMIN
    path('admin/', admin.site.urls),

    # AUTH
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/signup/', signup, name='signup'),

    # API
    path('api/', include(router.urls)),
]

# MEDIA
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)