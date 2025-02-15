from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [    
    path('', countryMasterList, name="countryMasterList"),
    path('ListAPI/',countryMasterListAPI.as_view() , name="ListAPI"),    
    path('modify=<slug:slug>/', countryMasterDetailsAPI.as_view(), name="DetailsAPI"),            
    path('CreateUpdate/', countryMasterCreateUpdate, name="CreateUpdate"),    
    path('CreateUpdateAPI/', countryMasterCreateUpdateAPI, name="CreateUpdateAPI"),   
]
