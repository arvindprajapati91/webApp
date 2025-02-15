from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [
    path('', configurationList, name="configurationList"),
    path('ListAPI/',configurationListAPI.as_view() , name="ListAPI"),
    path('modify=<slug:slug>/', configurationDetailsAPI.as_view(), name="DetailsAPI"),
    path('CreateUpdate/', configurationCreateUpdate, name="CreateUpdate"),
    path('CreateUpdateAPI/', configurationCreateUpdateAPI, name="CreateUpdateAPI"),
]
