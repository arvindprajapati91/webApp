from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [    
    path('', seriesMasterList, name="seriesMasterList"),
    path('ListAPI/',seriesMasterListAPI.as_view() , name="ListAPI"),    
    path('modify=<slug:slug>/', seriesMasterDetailsAPI.as_view(), name="DetailsAPI"),            
    path('CreateUpdate/', seriesMasterCreateUpdate, name="CreateUpdate"),    
    path('CreateUpdateAPI/', seriesMasterCreateUpdateAPI, name="CreateUpdateAPI"),   
]
