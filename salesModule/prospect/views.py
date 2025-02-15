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
modelName = Prospect
appName =  settings.APP_NAME
login_url = '/'
form_name = "Prospect"

def prospectList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)

class prospectListAPI(ListAPIView):
    serializer_class = prospectSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        a = self.request.user.is_authenticated
        return get_queryset_app_ListAPI(self.request,modelName=modelName)
    
def pendingProspectList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)

class pendingProspectListAPI(ListAPIView):
    serializer_class = prospectSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        a = self.request.user.is_authenticated
        return get_queryset_app_ListAPI(self.request,modelName=modelName)

class prospectDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = prospectSerializers
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)

def prospectCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="Create")
    else:
        return redirect(login_url)

@transaction.atomic
@catch_exceptions
def prospectCreateUpdateAPI(request):
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
            process = Process_Master.objects.filter(process_desc=form_name).first()
            field_names = [f.name for f in modelName._meta.get_fields()]
            obj, created  = modelName.objects.get_or_create(pk=obj_id)
            objSave(request, obj, body_data, obj_id, field_names)
            if created:
                lastSeries = Series_Master.objects.filter(process=process,organisation=userOrg).first()
                obj.process = process
                obj.status = "Pending for Lead"
                nextNumber = str(lastSeries.series_no+1).zfill(6)
                currentYear = datetime.now().year
                prospect_number = f"PSPT-{userOrg.short_name}-{currentYear}-{nextNumber}"
                obj.prospect_number = prospect_number
                obj.created_by = request.user   
                obj.updated_by = request.user
                obj.organisation = userOrg
                obj.save()
                lastSeries.series_no = lastSeries.series_no+1
                lastSeries.save()
            else:
                obj.save()
            if created:
                action_desc = "Created"
            else:
                action_desc = "Modified"
            auditTrailSave(request,action_desc,modelName,obj,record_no=obj.prospect_number,process=process)
            data = {
                "status":"Ok"
            }
            return JsonResponse(data)
    else:
        return redirect(login_url)
