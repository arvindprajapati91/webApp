from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [
    path('ListAPI/',menuMasterListAPI.as_view() , name="ListAPI"),
    path('ParentMenuAPI/', parentMenuMasterListAPI.as_view(), name="ParentMenuAPI"),
    # path('modify=<slug:slug>/', menuMasterDetail, name="DetailsAPI"),
    path('modify=<slug:slug>/', menuMasterDetailsAPI.as_view(), name="DetailsAPI"),
    path('', menuMasterList, name="menuMasterList"),
    path('CreateUpdate/', menuMasterCreateUpdate, name="CreateUpdate"),
    path('menuCountAPI/', menuCountAPI, name="menuCountAPI"),
    path('CreateUpdateAPI/', menuCreateUpdate, name="CreateUpdateAPI"),

]
