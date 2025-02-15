from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [    
    path('', locationMasterList, name="locationMasterList"),
    path('ListAPI/',locationMasterListAPI.as_view() , name="ListAPI"),    
    path('modify=<slug:slug>/', locationMasterDetailsAPI.as_view(), name="DetailsAPI"),            
    path('CreateUpdate/', locationMasterCreateUpdate, name="CreateUpdate"),    
    path('CreateUpdateAPI/', locationMasterCreateUpdateAPI, name="CreateUpdateAPI"),   
]
