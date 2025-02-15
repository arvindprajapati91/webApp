from django.shortcuts import redirect
from appRoot.utils import catch_exceptions, random_string_generator
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView,RetrieveAPIView
from django.http import JsonResponse
from django.db import transaction
import json
from appRoot.views import LargeResultsSetPagination, get_queryset_app_ListAPI, get_queryset_app_detailAPI, redirectURL
from administration.menuMaster.models import Menu_Master

# Create your views here.
User = get_user_model()
modelName = Role_Master
appName =  settings.APP_NAME
login_url = '/'
form_name = "Role Master"

def roleMasterList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)


class roleMasterListAPI(ListAPIView):
    serializer_class = roleMasterSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        return get_queryset_app_ListAPI(self.request,modelName=modelName)

class roleMasterDetailsAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = roleMasterSerializers
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)


class menuAccessListAPI(RetrieveAPIView):
    queryset = modelName.objects.all()
    serializer_class = roleMasterSerializers
    lookup_field = 'slug'

def roleMasterCreateUpdate(request):
    if request.user.is_authenticated:
        return redirectURL(request,form_name,type="Create")
    else:
        return redirect(login_url)

# Create Update Function
@transaction.atomic
@catch_exceptions
def roleCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            role_code = body_data['role_code']
            role_desc = body_data['role_desc']
            menu_ids = body_data['menu_ids']
            obj_id = body_data['obj_id']
            org_code = body_data['orgSelected']
            org = Organisation.objects.filter(org_code=org_code).first()
            if obj_id == "":
                obj_id = None
            else:
                obj_id = obj_id

            if role_code == "ORGADMIN" and request.user.is_admin is False:
                data = {
                    "error_msg": "You don't have permission to make the changes for this role!"
                }
                return JsonResponse(data)

            code = modelName.objects.filter(role_code=role_code,organisation=org).exclude(id=obj_id).first()
            if code:
                data = {
                    "error_msg": "'"+code.role_code+"' code is already available!"
                }
                return JsonResponse(data)
            role_desc = modelName.objects.filter(role_desc=role_desc,organisation=org).exclude(id=obj_id).first()
            if role_desc:
                data = {
                    "error_msg": "'"+role_desc.role_desc+"' role name is already available!"
                }
                return JsonResponse(data)
            menu_ = []
            # parent_menus = Menu_Master.objects.values_list('parent_menu_id',flat=True).filter(id__in=menu_ids).distinct()
            # if parent_menus:
            #     for i in parent_menus:
            #         if i is not None:
            #             menu_.append(i)

            child_menus = Menu_Master.objects.values_list('id',flat=True).filter(id__in=menu_ids).filter(is_parent=False).distinct()
            if child_menus:
                for i in child_menus:
                    if i is not None:
                        menu_.append(i)

            parent_manus = Menu_Master.objects.values_list('parent_menu_id',flat=True).filter(id__in=menu_).distinct()
            if parent_manus:
                for i in parent_manus:
                    if i is not None:
                        menu_.append(i)

            if body_data['status'] == '1':
                status = True
            else:
                status = False

            obj, created  = modelName.objects.get_or_create(pk=obj_id)
            if created:
                obj.role_desc=body_data['role_desc']
                obj.role_code=body_data['role_code']
                obj.slug=str(random_string_generator())+str(obj.id)
                obj.status=status
                obj.created_by = request.user
                obj.updated_by = request.user
                obj.menu_access.clear()
                obj.menu_access.add(* menu_)

            else:
                obj.role_desc=body_data['role_desc']
                obj.role_code=body_data['role_code']
                obj.status=status
                obj.updated_by = request.user
                obj.menu_access.clear()
                obj.menu_access.add(* menu_)
            obj.organisation=org
            obj.save()
            data = {
                "status":"Ok"
            }
            return JsonResponse(data)
    else:
        return redirect(login_url)

# def menuMasterDetail(request,id):
#     previous_url = request.META.get('HTTP_REFERER')
#     if previous_url is None:
#         context = {
#             "form_name":"Menu Update"
#         }
#         return render(request, 'build/index.html',context)
#     else:
#         response = HttpResponse.status_code
#         qs = Menu_Master.objects.filter(id=id).first()
#         data = {
#             "menu_desc" : qs.menu_desc
#         }
#         return JsonResponse(data)