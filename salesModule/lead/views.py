from datetime import datetime
from django.http.response import HttpResponse
from django.shortcuts import render, redirect,HttpResponse
from administration.seriesMaster.models import Series_Master
from appRoot.utils import auditTrailSave, catch_exceptions, objSave, random_string_generator
from .models import *
from .serializers import *
from rest_framework.generics import ListAPIView,RetrieveAPIView
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.db import connection
from django.db import transaction
import json
from appRoot.views import LargeResultsSetPagination, get_queryset_app_ListAPI, get_queryset_app_detailAPI, redirectURL

User = get_user_model()
modelName = Lead
appName =  settings.APP_NAME
login_url = '/'
form_name = "Lead"

def leadList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)

class leadListAPI(ListAPIView):
    serializer_class = leadSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        a = self.request.user.is_authenticated
        return get_queryset_app_ListAPI(self.request,modelName=modelName)
    
def pendingleadList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)

class pendingleadListAPI(ListAPIView):
    serializer_class = leadSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        a = self.request.user.is_authenticated
        return get_queryset_app_ListAPI(self.request,modelName=modelName)

class leadDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = leadSerializers
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)

def leadCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="Create")
    else:
        return redirect(login_url)

@transaction.atomic
@catch_exceptions
def leadCreateUpdateAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            userOrg = request.user.organisation
            obj_id = body_data['obj_id']
            if obj_id == "":
                obj_id = None
            else:
                obj_id = obj_id
            
            data = {
                "status":"Ok"
            }
            return JsonResponse(data)
    else:
        return redirect(login_url)
