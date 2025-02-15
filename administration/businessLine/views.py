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
modelName = Business_Line
appName =  settings.APP_NAME
login_url = '/'

form_name = "Business Line"

def businessLineList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)

class businessLineListAPI(ListAPIView):
    serializer_class = businessLineSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        return get_queryset_app_ListAPI (self.request,modelName=modelName)


class businessLineDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = businessLineSerializers
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)

def businessLineCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="Create")
    else:
        return redirect(login_url)

# Create Update Function
@transaction.atomic
@catch_exceptions
def businessLineCreateUpdateAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            bl_code = body_data['bl_code']
            bl_desc = body_data['bl_desc']
            org_code = body_data['orgSelected']
            org = Organisation.objects.filter(org_code=org_code).first()

            obj_id = body_data['obj_id']
            if obj_id == "":
                obj_id = None
            else:
                obj_id = obj_id
            bl_code = modelName.objects.filter(bl_code=bl_code,organisation=org).exclude(id=obj_id).first()
            if bl_code:
                data = {
                    "error_msg": "'"+bl_code.bl_code+"' code is already available for {}!".format(org.org_desc)
                }
                return JsonResponse(data)
            bl_desc = modelName.objects.filter(bl_desc=bl_desc,organisation=org).exclude(id=obj_id).first()
            if bl_desc:
                data = {
                    "error_msg": "'"+bl_desc.bl_desc+"' BL name is already available for {}!".format(org.org_desc)
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
