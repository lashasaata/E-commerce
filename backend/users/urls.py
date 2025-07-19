from django.urls import path, include
from .views import RegisterView, LoginView, UserView, LogoutView
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r"register", RegisterView, basename="register")
# router.register(r"login", LoginView, basename="login")
# router.register(r"user", UserView, basename="user")
# router.register(r"logout", LogoutView, basename="logout")

# urlpatterns = router.urls

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view())
    ]