from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [    
    path('', statusMasterList, name="statusMasterList"),
    path('ListAPI/',statusMasterListAPI.as_view() , name="ListAPI"),    
    path('modify=<slug:slug>/', statusMasterDetailsAPI.as_view(), name="DetailsAPI"),            
    path('CreateUpdate/', statusMasterCreateUpdate, name="CreateUpdate"),    
    path('CreateUpdateAPI/', statusMasterCreateUpdateAPI, name="CreateUpdateAPI"),   
]
