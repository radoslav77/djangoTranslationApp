from django.urls import path
from . import views
# create your url path here

urlpatterns = [
    path('', views.index, name='index')
]
