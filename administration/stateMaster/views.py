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
modelName = State_Master
appName =  settings.APP_NAME
login_url = '/'
form_name = "Department Master"

@catch_exceptions
def stateMasterList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)

class stateMasterListAPI(ListAPIView):
    serializer_class = stateMasterSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        return get_queryset_app_ListAPI (self.request,modelName=modelName)


class stateMasterDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = stateMasterSerializers
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)

@catch_exceptions
def stateMasterCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="Create")
    else:
        return redirect(login_url)

# Create Update Function
@transaction.atomic
@catch_exceptions
def stateMasterCreateUpdateAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            state_code = body_data['state_code']
            state_name = body_data['state_name']

            obj_id = body_data['obj_id']
            if obj_id == "":
                obj_id = None
            else:
                obj_id = obj_id
            state_code = modelName.objects.filter(state_code=state_code).exclude(id=obj_id).first()
            if state_code:
                data = {
                    "error_msg": "'"+state_code.state_code+"' code is already available!"
                }
                return JsonResponse(data)
            state_name = modelName.objects.filter(state_name=state_name).exclude(id=obj_id).first()
            if state_name:
                data = {
                    "error_msg": "'"+state_name.state_name+"' BL name is already available!"
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
