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
modelName = Country_Master
appName =  settings.APP_NAME
login_url = '/'
form_name = "Country Master"

def countryMasterList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        context = {
            "form_name": form_name+" List"
        }
        return render(request, 'build/index.html',context)
    else:
        return redirect(login_url)


class countryMasterListAPI(ListAPIView):
    serializer_class = countryMasterSerializers
    pagination_class = LargeResultsSetPagination
    permission_class = IsAuthenticated
    def get_queryset(self):
        return get_queryset_app_ListAPI (self.request,modelName=modelName)


class countryMasterDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = countryMasterSerializers
    permission_class = IsAuthenticated
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)

def countryMasterCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        context = {
            "form_name": form_name+" Create"
        }
        return render(request, 'build/index.html',context)
    else:
        return redirect(login_url)

# Create Update Function
@catch_exceptions
@transaction.atomic
def countryMasterCreateUpdateAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            country_code = body_data['country_code']
            country_name = body_data['country_name']

            obj_id = body_data['obj_id']
            if obj_id == "":
                obj_id = None
            else:
                obj_id = obj_id
            country_code = modelName.objects.filter(country_code=country_code).exclude(id=obj_id).first()
            if country_code:
                data = {
                    "error_msg": "'"+country_code.country_code+"' code is already available!"
                }
                return JsonResponse(data)
            country_name = modelName.objects.filter(country_name=country_name).exclude(id=obj_id).first()
            if country_name:
                data = {
                    "error_msg": "'"+country_name.country_name+"' Country name is already available!"
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
