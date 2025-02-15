from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [    
    path('', departmentMasterList, name="departmentMasterList"),
    path('ListAPI/',departmentMasterListAPI.as_view() , name="ListAPI"),    
    path('modify=<slug:slug>/', departmentMasterDetailsAPI.as_view(), name="DetailsAPI"),            
    path('CreateUpdate/', departmentMasterCreateUpdate, name="CreateUpdate"),    
    path('CreateUpdateAPI/', departmentMasterCreateUpdateAPI, name="CreateUpdateAPI"),   
]
