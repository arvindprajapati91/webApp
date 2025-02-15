from django.http.response import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404,HttpResponse
from appRoot.settings import STATIC_ROOT
from appRoot.utils import catch_exceptions, random_string_generator
from .models import *
from .serializers import *
from rest_framework.generics import ListAPIView,RetrieveAPIView
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.db import connection
from django.db import transaction
import json
from appRoot.views import LargeResultsSetPagination, get_queryset_app_ListAPI, get_queryset_app_detailAPI, redirectURL


# Create your views here.
User = get_user_model()
modelName = Menu_Master
appName =  settings.APP_NAME
login_url = '/'
form_name = "Menu Master"

def menuMasterList(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="List")
    else:
        return redirect(login_url)

class menuMasterListAPI(ListAPIView):
    serializer_class = menuMasterSerializers
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        a = self.request.user.is_authenticated
        return get_queryset_app_ListAPI(self.request,modelName=modelName)

class parentMenuMasterListAPI(ListAPIView):
    queryset = Menu_Master.objects.all().filter(is_parent=True,admin_only=False)
    serializer_class = parentMenuMasterSerializers

class menuMasterDetailsAPI(RetrieveAPIView):
    queryset = Menu_Master.objects.all()
    serializer_class = menuMasterSerializers
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        return get_queryset_app_detailAPI(self,request,form_name)


def menuMasterCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        return redirectURL(request,form_name,type="Create")
    else:
        return redirect(login_url)

def menuCountAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        cursor = connection.cursor()
        if request.GET.get("pm") == "parent":
            sql_string = "SELECT max(order_level) FROM tbl_menu_master WHERE is_parent='1'"
        else:
            sql_string = "SELECT max(order_level) FROM tbl_menu_master WHERE is_parent='0' AND parent_menu_id='" + request.GET.get('pm') +"'"
        cursor.execute(sql_string)
        cnt = cursor.fetchone()
        maxCount = cnt[0]
        if maxCount is None:
            maxCount = 0
        else:
            maxCount=maxCount

        data = {
                'maxCount' : float(maxCount+1)
            }

        return JsonResponse(data)
    else:
        return redirect(login_url)

# Create Update Function
@transaction.atomic
@catch_exceptions
def menuCreateUpdate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            menu_desc = body_data['menu_desc']
            obj_id = body_data['obj_id']
            if obj_id == "":
                obj_id = None
            else:
                obj_id = obj_id

            menu_desc = Menu_Master.objects.filter(menu_desc=menu_desc).exclude(id=obj_id).first()
            if menu_desc:
                data = {
                    "error_msg": "'"+menu_desc.menu_desc+"' menu is already available!"
                }
                return JsonResponse(data)

            if body_data['status'] == '1':
                status = True
            else:
                status = False

            if body_data['admin_only'] == '1':
                admin_only = True
            else:
                admin_only = False

            obj, created  = modelName.objects.get_or_create(pk=obj_id)
            if created:
                obj.menu_desc=body_data['menu_desc']
                if body_data['is_parent'] == "child":
                    obj.parent_menu_id = body_data['parent_menu']
                    obj.menu_url = body_data['menu_url']
                    obj.is_parent = False
                else:
                    obj.is_parent = True
                    obj.parent_icon = body_data['parent_icon']
                obj.order_level = body_data['order_level']
                obj.app_folder = body_data['app_folder']
                obj.status=status
                obj.created_by=request.user
                obj.updated_by=request.user
                obj.slug=str(random_string_generator())+str(obj.id)
            else:
                obj.menu_desc=body_data['menu_desc']
                if body_data['is_parent'] == "child":
                    obj.parent_menu_id = body_data['parent_menu']
                    obj.menu_url = body_data['menu_url']
                    obj.is_parent = False
                else:
                    obj.is_parent = True
                    obj.parent_icon = body_data['parent_icon']
                obj.order_level = body_data['order_level']
                obj.app_folder = body_data['app_folder']
                obj.status=status
                obj.updated_by=request.user

            obj.admin_only = admin_only
            obj.folder_size = int(body_data['folder_size'])
            obj.save()

            data = {
                "status":"Ok"
            }
            return JsonResponse(data)
    else:
        return redirect(login_url)

def menuMasterDetail(request,id):
    if request.user.is_authenticated:
        request.session.modified = True
        previous_url = request.META.get('HTTP_REFERER')
        if previous_url is None:
            context = {
                "form_name":"Menu Update"
            }
            return render(request, 'build/index.html',context)
        else:
            response = HttpResponse.status_code
            qs = Menu_Master.objects.filter(id=id).first()
            data = {
                "menu_desc" : qs.menu_desc
            }
            return JsonResponse(data)
    else:
        return redirect(login_url)