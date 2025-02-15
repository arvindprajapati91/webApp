from django.shortcuts import redirect
from appRoot.utils import catch_exceptions, objSave
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView,RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.db import transaction
import json
from appRoot.views import LargeResultsSetPagination, get_queryset_app_ListAPI, get_queryset_app_detailAPI, redirectURL
from administration.processMaster.models import Process_Master

# Create your views here.
User = get_user_model()
modelName = Series_Master
appName =  settings.APP_NAME
login_url = '/'
form_name = "Series Master"

def seriesMasterList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)


class seriesMasterListAPI(ListAPIView):
    serializer_class = seriesMasterSerializers
    pagination_class = LargeResultsSetPagination
    permission_class = IsAuthenticated
    def get_queryset(self):
        return get_queryset_app_ListAPI (self.request,modelName=modelName)


class seriesMasterDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = seriesMasterSerializers
    permission_class = IsAuthenticated
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)

def seriesMasterCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="Create")
    else:
        return redirect(login_url)

# Create Update Function
@transaction.atomic
@catch_exceptions
@transaction.atomic
def seriesMasterCreateUpdateAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            obj_id = body_data['obj_id']
            if obj_id == "":
                obj_id = None
            else:
                obj_id = obj_id

            process = Process_Master.objects.filter(process_desc=body_data['process']).first()

            field_names = [f.name for f in modelName._meta.get_fields()]
            obj, created  = modelName.objects.get_or_create(pk=obj_id)
            objSave(request, obj, body_data, obj_id, field_names)
            orgID = body_data['org_id']
            org = Organisation.objects.filter(id=orgID).first()
            obj.organisation = org
            obj.save()
            data = {
                "status":"Ok"
            }

            return JsonResponse(data)
    else:
        return redirect(login_url)
