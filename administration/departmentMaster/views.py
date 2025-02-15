from django.shortcuts import render,redirect
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView,RetrieveAPIView
from django.http import JsonResponse
from django.db import transaction
import json
from appRoot.views import LargeResultsSetPagination, get_queryset_app_ListAPI, get_queryset_app_detailAPI, redirectURL
from appRoot.utils import catch_exceptions, objSave

# Create your views here.
User = get_user_model()
modelName = Department_Master
appName =  settings.APP_NAME
login_url = '/'
form_name = "Department Master"

@catch_exceptions
def departmentMasterList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)

class departmentMasterListAPI(ListAPIView):
    serializer_class = departmentMasterSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        return get_queryset_app_ListAPI (self.request,modelName=modelName)


class departmentMasterDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = departmentMasterSerializers
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)

@catch_exceptions
def departmentMasterCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="Create")
    else:
        return redirect(login_url)

# Create Update Function
@transaction.atomic
@catch_exceptions
def departmentMasterCreateUpdateAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            dep_code = body_data['dep_code']
            dep_desc = body_data['dep_desc']
            org_code = body_data['orgSelected']
            org = Organisation.objects.filter(org_code=org_code).first()

            obj_id = body_data['obj_id']
            if obj_id == "":
                obj_id = None
            else:
                obj_id = obj_id
            dep_code = modelName.objects.filter(dep_code=dep_code,organisation=org).exclude(id=obj_id).first()
            if dep_code:
                data = {
                    "error_msg": "'"+dep_code.dep_code+"' code is already available for {}!".format(org.org_desc)
                }
                return JsonResponse(data)
            dep_desc = modelName.objects.filter(dep_desc=dep_desc,organisation=org).exclude(id=obj_id).first()
            if dep_desc:
                data = {
                    "error_msg": "'"+dep_desc.dep_desc+"' BL name is already available for {}!".format(org.org_desc)
                }
                return JsonResponse(data)

            field_names = [f.name for f in modelName._meta.get_fields()]
            obj, created  = modelName.objects.get_or_create(pk=obj_id)
            objSave(request, obj, body_data, obj_id, field_names)

            data = {
                "status":"Ok"
            }
            return JsonResponse(data)
    else:
        return redirect(login_url)
