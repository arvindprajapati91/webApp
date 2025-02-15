from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [    
    path('', prospectList, name="prospectList"),
    path('ListAPI/',prospectListAPI.as_view() , name="ListAPI"),    
    path('modify=<slug:slug>/', prospectDetailsAPI.as_view(), name="DetailsAPI"),            
    path('CreateUpdate/', prospectCreateUpdate, name="CreateUpdate"),    
    path('CreateUpdateAPI/', prospectCreateUpdateAPI, name="CreateUpdateAPI"),   
    path('pendingProspect', pendingProspectList, name="pendingProspectList"),
    path('pendingProspectListAPI/',pendingProspectListAPI.as_view() , name="pendingProspectListAPI"), 
]
