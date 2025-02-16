from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [    
    path('', leadList, name="leadList"),
    path('ListAPI/',leadListAPI.as_view() , name="ListAPI"),    
    path('modify=<slug:slug>/', leadDetailsAPI.as_view(), name="DetailsAPI"),            
    path('CreateUpdate/', leadCreateUpdate, name="CreateUpdate"),    
    path('CreateUpdateAPI/', leadCreateUpdateAPI, name="CreateUpdateAPI"),   
    path('pendingLead', pendingLeadList, name="pendingLeadList"),
    path('pendingLeadListAPI/',pendingLeadListAPI.as_view() , name="pendingLeadListAPI"), 
]
