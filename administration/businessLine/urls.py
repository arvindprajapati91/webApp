from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [    
    path('', businessLineList, name="businessLineList"),
    path('ListAPI/',businessLineListAPI.as_view() , name="ListAPI"),    
    path('modify=<slug:slug>/', businessLineDetailsAPI.as_view(), name="DetailsAPI"),            
    path('CreateUpdate/', businessLineCreateUpdate, name="CreateUpdate"),    
    path('CreateUpdateAPI/', businessLineCreateUpdateAPI, name="CreateUpdateAPI"),   
]
