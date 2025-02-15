from django.shortcuts import redirect
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.db import transaction
import json
import rstr
from auditlog.models import *
from administration.auditTrail.models import Audit_Trail
from administration.processMaster.models import Process_Master
from django.contrib.contenttypes.models import ContentType
from appRoot.views import LargeResultsSetPagination, get_queryset_app_ListAPI, get_queryset_app_detailAPI, redirectURL
from appRoot.utils import objSave,catch_exceptions

# Create your views here.
User = get_user_model()
modelName = User
appName =  settings.APP_NAME
login_url = '/'
form_name = "User Master"

def userMasterList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)

class userMasterListAPI(ListAPIView):
    serializer_class = userMasterSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        return get_queryset_app_ListAPI(self.request, modelName=modelName)


class userMasterDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = userMasterSerializers
    lookup_field = 'slug'
    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)

class userMasterAuditTrailAPI(ListAPIView):
    serializer_class = userMasterAuditTrailView
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        return get_queryset_app_ListAPI(self.request, modelName=User_Master_Audit_Trail_View)


def userMasterCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="Create")
    else:
        return redirect(login_url)


# Create Update Function
@transaction.atomic
@catch_exceptions
def userMasterCreateUpdateAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            obj_id = body_data['obj_id']
            if obj_id == "":
                obj_id = None
                audit_type = "Created"
            else:
                obj_id = obj_id
                audit_type = "Modified"
            # username check
            username = modelName.objects.filter(username=body_data['username']).exclude(id=obj_id).first()
            if username:
                data = {
                    "error_msg": "'"+username.username+"' username is already exist!"
                }
                return JsonResponse(data)
            # email check
            email = modelName.objects.filter(email=body_data['email']).exclude(id=obj_id).first()
            if email:
                data = {
                    "error_msg": "'"+email.email+"' email is already exist!"
                }
                return JsonResponse(data)

            # employee_code check
            employee_code = modelName.objects.filter(employee_code=body_data['employee_code']).exclude(id=obj_id).first()
            if employee_code:
                data = {
                    "error_msg": "'"+employee_code.employee_code+"' Employee Code is already exist!"
                }
                return JsonResponse(data)

            # Manager Check
            if body_data["managerSelected"] == "":
                data = {
                    "error_msg": "Please select Reprting Manager from List"
                }
                return JsonResponse(data)

            process = Process_Master.objects.filter(process_desc="User Master").first()

            field_names = [f.name for f in modelName._meta.get_fields()]
            content_type = ContentType.objects.get(model=modelName._meta.model_name)
            changeHistory_first = LogEntry.objects.filter(object_id=obj_id).filter(content_type_id=content_type.id).first()
            if changeHistory_first is None:
                lastChange = ""
            else:
                lastChange = changeHistory_first.changes

            obj, created = modelName.objects.get_or_create(pk=obj_id)

            rel_history = LogEntry.objects.get_for_objects(obj.role_access.all())
            prv_code=""
            for i in rel_history:
                rc = i.changes
                for k in rc:
                    if k == "role_code":
                        prv_code = prv_code+rc["role_code"][1]+" - "+rc["role_desc"][1]+", "
            prv_rd = "Role Access : ("+prv_code[:-2]+")"

            objSave(request, obj, body_data, obj_id, field_names)
            if created:
                action_desc = "Created"
            else:
                action_desc = "Modified"

            rel_history = LogEntry.objects.get_for_objects(obj.role_access.all())
            r_code=""
            for i in rel_history:
                rc = i.changes
                for k in rc:
                    if k == "role_code":
                        r_code = r_code+rc["role_code"][1]+" - "+rc["role_desc"][1]+", "
            rd = "Role Access : ("+r_code[:-2]+")"

            changeHistory = LogEntry.objects.filter(object_id=obj_id).filter(content_type_id=content_type.id).first()
            if changeHistory is None:
                nextChange = ""
            else:
                nextChange = changeHistory.changes
            changes = ""
            if lastChange == nextChange:
                changes = ""
            else:
                nextChange = nextChange
                for i in nextChange:
                    values = nextChange[i]
                    if i == 'password':
                        changes = changes+i+": Password modified"
                    else:
                        changes = changes+i+": from "+values[0]+" to "+values[1]+"\n"
            if changes == "":
                if prv_rd == rd:
                    finalChanges = ""
                else:
                    finalChanges = rd
            else:
                if prv_rd == rd:
                    finalChanges = changes
                else:
                    finalChanges = changes+"\n"+rd

            audit_trail = Audit_Trail(unq_id=obj.id, process=process, action_desc=action_desc, action_by=request.user, changes=finalChanges,comments="")
            audit_trail.save()

            data = {
                "status": "Ok"
            }
            return JsonResponse(data)
    else:
        return redirect(login_url)


# ---Random Password Generate----
def password_generate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        # "[\l]{4}@[\d]{1}[\l]{5}"
        data = {
            'password': rstr.xeger(r'[A-ZA-Z][$]\d[a-z][a-z]\d[A-Z][a-z][@]\d[A-Z]\d')
        }
        return JsonResponse(data)
    else:
        return redirect(login_url)

