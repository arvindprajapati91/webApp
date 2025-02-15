from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [
    path('', stateMasterList, name="stateMasterList"),
    path('ListAPI/',stateMasterListAPI.as_view() , name="ListAPI"),
    path('modify=<slug:slug>/', stateMasterDetailsAPI.as_view(), name="DetailsAPI"),
    path('CreateUpdate/', stateMasterCreateUpdate, name="CreateUpdate"),
    path('CreateUpdateAPI/', stateMasterCreateUpdateAPI, name="CreateUpdateAPI"),
]
