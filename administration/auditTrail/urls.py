from django.urls import path
from .views import *
from appRoot.utils import *


urlpatterns = [
    path('auditTrailViewAPI/', auditTrailViewAPI.as_view(), name="auditTrailViewAPI"),
]
