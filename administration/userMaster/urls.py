from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [
    path('', userMasterList, name="userMasterList"),
    path('userMasters/', userMasterList, name="userMasterList"),
    path('ListAPI/',userMasterListAPI.as_view() , name="ListAPI"),
    path('modify=<slug:slug>/', userMasterDetailsAPI.as_view(), name="DetailsAPI"),
    path('CreateUpdate/', userMasterCreateUpdate, name="CreateUpdate"),
    path('CreateUpdateAPI/', userMasterCreateUpdateAPI, name="CreateUpdateAPI"),
    path('pwdgn/', password_generate, name="pwdgn"),
    path('userMasterAuditTrailAPI/', userMasterAuditTrailAPI.as_view(), name="userMasterAuditTrailAPI"),
]
