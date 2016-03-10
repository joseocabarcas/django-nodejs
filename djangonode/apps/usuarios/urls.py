from django.conf.urls import include, url
from .views import LoginView,HomeView, Logout
urlpatterns = [
    url(r'^$', LoginView.as_view(), name="/"),
    url(r'^home/$', HomeView.as_view(), name="home/"),
    url(r'^logout/$', Logout, name='logout/'),
]