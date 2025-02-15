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
from administration.roleMaster.models import Role_Master

# Create your views here.
User = get_user_model()
modelName = Organisation
appName =  settings.APP_NAME
login_url = '/'
form_name = "Organisation"

def organisationList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)


class organisationListAPI(ListAPIView):
    serializer_class = organisationSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        return get_queryset_app_ListAPI (self.request,modelName=modelName)

# class organisationLadderListAPI(ListAPIView):
#     serializer_class = organisationLadderSerializers
#     def get_queryset(self):
#         return get_queryset_app_ListAPI (self.request,modelName=Organisation_Ladder)

def ladderListAPI(request):
    data = {
        "status" : "Ok"
    }
    return JsonResponse(data)

class organisationDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = organisationSerializers
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)

def organisationCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="Create")
    else:
        return redirect(login_url)

# Create Update Function
@transaction.atomic
@catch_exceptions
def organisationCreateUpdateAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            org_code = body_data['org_code']
            org_desc = body_data['org_desc']

            obj_id = body_data['obj_id']
            if obj_id == "":
                obj_id = None
            else:
                obj_id = obj_id
            org_code = modelName.objects.filter(org_code=org_code).exclude(id=obj_id).first()
            if org_code:
                data = {
                    "error_msg": "'"+org_code.org_code+"' code is already available!"
                }
                return JsonResponse(data)
            org_desc = modelName.objects.filter(org_desc=org_desc).exclude(id=obj_id).first()
            if org_desc:
                data = {
                    "error_msg": "'"+org_desc.org_desc+"' BL name is already available!"
                }
                return JsonResponse(data)

            field_names = [f.name for f in modelName._meta.get_fields()]

            obj, created  = modelName.objects.get_or_create(pk=obj_id)
            if created:
                objSave(request, obj, body_data, obj_id, field_names)
            else:
                objSave(request, obj, body_data, obj_id, field_names)
            data = {
                "status":"Data saved successfully"
            }
            return JsonResponse(data)
    else:
        return redirect(login_url)

# @transaction.atomic
# @catch_exceptions
# def createUpdateApprovalLadderAPI(request):
#     if request.user.is_authenticated:
#         request.session.modified = True
#         body_data = json.loads(request.body.decode("utf-8"))
#         if request.method == "POST":
#             obj_id_al = body_data['obj_id_al']
#             if obj_id_al == "":
#                 obj_id_al = None
#             else:
#                 obj_id_al = obj_id_al

#             obj, created  = Organisation_Ladder.objects.get_or_create(pk=obj_id_al)
#             obj.organisation_id = body_data['obj_id']
#             obj.process = Process_Master.objects.filter(process_desc=body_data['process_desc']).first()
#             obj.role = Role_Master.objects.filter(role_desc=body_data['role_desc']).first()
#             obj.approval_order = body_data['approval_order']
#             obj.approval_limit = body_data['approval_limit']
#             if created:
#                 obj.created_by = request.user
#                 obj.updated_by = request.user
#             else:
#                 obj.updated_by = request.user
#             obj.save()
#             data = {
#                 "status":"Ok"
#             }
#         elif request.method == "DELETE":
#             obj_id_al = body_data['obj_id_al']
#             if obj_id_al == "":
#                 obj_id_al = None
#                 data = {
#                     "status" : "error"
#                 }
#                 return JsonResponse(data)
#             else:
#                 obj_id_al = obj_id_al
#                 Organisation_Ladder.objects.filter(id=obj_id_al).delete()
#                 data = {
#                     "status":"Ok"
#                 }
#         return JsonResponse(data)
#     else:
#         return redirect(login_url)