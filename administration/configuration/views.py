from django.shortcuts import render, redirect
from appRoot.utils import catch_exceptions, objSave
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView,RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.db import transaction
import json
from appRoot.views import LargeResultsSetPagination, get_queryset_app_ListAPI, get_queryset_app_detailAPI

# Create your views here.
User = get_user_model()
modelName = Configuration
appName =  settings.APP_NAME
login_url = '/'
form_name = "Configuration"

def configurationList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        context = {
            "form_name": form_name+" List"
        }
        return render(request, 'build/index.html',context)
    else:
        return redirect(login_url)


class configurationListAPI(ListAPIView):
    serializer_class = configurationSerializers
    pagination_class = LargeResultsSetPagination
    permission_class = IsAuthenticated
    def get_queryset(self):
        return get_queryset_app_ListAPI (self.request,modelName=modelName)


class configurationDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = configurationSerializers
    permission_class = IsAuthenticated
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)

def configurationCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        context = {
            "form_name": form_name+" Create"
        }
        return render(request, 'build/index.html',context)
    else:
        return redirect(login_url)

# Create Update Function
@transaction.atomic
@catch_exceptions
@transaction.atomic
def configurationCreateUpdateAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            configuration = body_data['configuration']
            value = body_data['value']
            obj_id = body_data['obj_id']
            if obj_id == "":
                obj_id = None
            else:
                obj_id = obj_id
            configuration = modelName.objects.filter(configuration=configuration).exclude(id=obj_id).first()
            if configuration:
                data = {
                    "error_msg": "'"+configuration.configuration+"' code is already available!"
                }
                return JsonResponse(data)
            value = modelName.objects.filter(value=value).exclude(id=obj_id).first()

            field_names = [f.name for f in modelName._meta.get_fields()]
            obj, created  = modelName.objects.get_or_create(pk=obj_id)
            objSave(request, obj, body_data, obj_id, field_names)

            data = {
                "status":"Ok"
            }
            return JsonResponse(data)
    else:
        return redirect(login_url)
