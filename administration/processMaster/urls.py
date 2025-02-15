from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [    
    path('', processMasterList, name="processMasterList"),
    path('ListAPI/',processMasterListAPI.as_view() , name="ListAPI"),    
    path('modify=<slug:slug>/', processMasterDetailsAPI.as_view(), name="DetailsAPI"),            
    path('CreateUpdate/', processMasterCreateUpdate, name="CreateUpdate"),    
    path('CreateUpdateAPI/', processMasterCreateUpdateAPI, name="CreateUpdateAPI"),   
]
