from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [    
    path('', roleMasterList, name="roleMasterList"),
    path('ListAPI/',roleMasterListAPI.as_view() , name="ListAPI"),    
    path('modify=<slug:slug>/', roleMasterDetailsAPI.as_view(), name="DetailsAPI"),        
    path('MenuAccessAPI/=<int:id>/',menuAccessListAPI.as_view() , name="MenuAccessAPI"),    
    path('CreateUpdate/', roleMasterCreateUpdate, name="CreateUpdate"),    
    path('CreateUpdateAPI/', roleCreateUpdate, name="CreateUpdateAPI"),
    
    
]
