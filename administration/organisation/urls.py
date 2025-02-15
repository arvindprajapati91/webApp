from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [
    path('', organisationList, name="organisationList"),
    path('ListAPI/',organisationListAPI.as_view() , name="ListAPI"),
    path('modify=<slug:slug>/', organisationDetailsAPI.as_view(), name="DetailsAPI"),
    path('CreateUpdate/', organisationCreateUpdate, name="CreateUpdate"),
    path('CreateUpdateAPI/', organisationCreateUpdateAPI, name="CreateUpdateAPI"),
    path('ladderListAPI/', ladderListAPI, name="ladderListAPI"),
]
