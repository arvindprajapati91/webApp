from datetime import datetime
import json
from tkinter.messagebox import RETRY
from django.shortcuts import render, redirect
from django.conf import settings
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import HttpResponse
from django.db.models import Q
from django.db import transaction
from administration.organisation.models import Organisation
from appRoot.settings import STATIC_ROOT
import csv
from django.contrib.sessions.models import Session
from django.utils import timezone
from administration.menuMaster.models import Menu_Master
from administration.stateMaster.models import State_Master
from administration.countryMaster.models import Country_Master
from administration.processMaster.models import Process_Ladder, Process_Master
from administration.roleMaster.models import Role_Master

User = get_user_model()

appName =  settings.APP_NAME
SysName = settings.APP_NAME
Home_Page = '/'+appName+'/homePage'
Invalid_User = '/'+appName+'/invalidUser'
sign_out_user = '/'+appName+'/signout'
login_url = '/'

#Home Page Function
def homePage(request):
    if request.user.is_authenticated:
        context = {
                "form_name": "Home Page | "+SysName
            }
        return render(request, 'build/index.html',context)
    else:
        return redirect(sign_in)

def home(request):
    context = initialize_context(request)
    return HttpResponse("A view protected by the decorator")

def changeOrg(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            body_data = json.loads(request.body.decode("utf-8"))
            orgSelected = body_data['orgSelected']
            org = Organisation.objects.filter(org_desc=orgSelected).first()

            data = {
                    "status": "Ok"
                }
            return JsonResponse(data)
    else:
        return redirect(sign_in)

#Login Scree Function
def loginPage(request):
    context = {
            "form_name": "Login | "+SysName,
        }
    if request.user.is_authenticated:
        return redirect(Home_Page)
    elif request.method == "POST":
        context.update(request.POST.dict())
        username = request.POST.get("username")
        password = request.POST.get("password")
        un = User.objects.filter(username=username.casefold()).first()
        if un is None:
            context["err_msg"] = "Invalid username!!" 
            return render(request, "build/loginPage.html", context=context)
        # if un.admin is False:
        #     context["err_msg"] = "Admin users can login from this page"
        #     return render(request, "build/loginPage.html", context=context)
        user = authenticate(request=request, username=un, password=password)
        if user is None:
            context["err_msg"] = "Invalid password!!"
            return render(request, "build/loginPage.html", context=context)
        else:
            login(request, user)
            return redirect(Home_Page)
    else:
        return render(request, 'build/loginPage.html',context)

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

#User Access based menu list
def userAccessAPI(request):
    if request.user.is_authenticated:
        if request.user.is_admin:
            # rl = User.objects.filter(id=request.user.id).values_list('role_access__id', flat=True)
            # ml = Role_Master.objects.filter(id__in=rl).values_list('menu_access__id', flat=True).distinct()
            # menu_list = Menu_Master.objects.filter(id__in=ml).filter(status=True).distinct().values().order_by('order_level')
            menu_list = Menu_Master.objects.filter(Q(menu_desc__contains='Admin') |
                                                   Q(parent_menu__menu_desc__contains = 'Administration')
                                                   ).filter(status=True).distinct().values().order_by('order_level')
        else:
            rl = User.objects.filter(id=request.user.id).values_list('role_access__id', flat=True)
            ml = Role_Master.objects.filter(id__in=rl).values_list('menu_access__id', flat=True).distinct()
            # menu_list = Menu_Master.objects.filter(id__in=ml).filter(is_parent=parent).distinct().values().order_by('order_level')
            menu_list = Menu_Master.objects.filter(id__in=ml).filter(status=True).distinct().values().order_by('order_level')
        menu = []
        for i in menu_list:
            data = {
                'id' : i['id'],
                'menu_desc' : i['menu_desc'],
                'menu_url' : i['menu_url'],
                'is_parent' : i['is_parent'],
                'order_level' : i['order_level'],
                'parent_menu_id' : i['parent_menu_id'],
                'parent_icon' : i['parent_icon'],

            }
            menu.append(data)
        return JsonResponse(menu, safe=False)
    else:
        return redirect(sign_in)

def getUserName(request):
    if request.user.is_authenticated:
        menuCount = Menu_Master.objects.count()
        try:
            organisation_name = request.user.organisation.org_desc
        except:
            organisation_name = ""
        try:
            org_short_name = request.user.organisation.short_name
        except:
            org_short_name = ""
        data ={
            "full_name": request.user.full_name,
            'adminAccess':request.user.is_admin,
            'organisation_name' : organisation_name,
            'org_short_name' : org_short_name,
            'menuCount':menuCount
        }
        return JsonResponse(data, safe=False)
    else:
        return redirect(sign_in)

def get_current_users():
    active_sessions = Session.objects.filter(expire_date__gte=timezone.now())
    user_id_list = []
    for session in active_sessions:
        data = session.get_decoded()
        user_id_list.append(data.get('_auth_user_id', None))
    # Query all logged in users based on id list
    return User.objects.filter(id__in=user_id_list)

@transaction.atomic
def bulkMenuCreate(request):
    if request.user.is_authenticated:
        request.session.modified = True
        if request.method == "POST":
            menu_wb = STATIC_ROOT / "./excelTemplate/tbl_menu_master.csv"
            with open(menu_wb) as f:
                reader = csv.reader(f)
                next(reader)
                for row in reader:
                    menu_desc = menu_desc=row[0]
                    if row[1] == '1':
                        is_parent = True
                    else:
                        is_parent = False
                    menu_url = row[2]
                    parent_icon = row[3]
                    app_folder = row[4]
                    order_level = int(row[5])
                    slug = row[9]
                    created_by_id = int(row[10])
                    if row[11] == '':
                        parent_menu_id = None
                    else:
                        parent_menu_id = int(row[11])
                    folder_size = int(row[13])
                    ml = Menu_Master(menu_desc=menu_desc,is_parent=is_parent,menu_url=menu_url,parent_icon=parent_icon,app_folder=app_folder,order_level=order_level,slug=slug,created_by_id=created_by_id,parent_menu_id=parent_menu_id,folder_size=folder_size)
                    ml.save()

            state_wb = STATIC_ROOT / "./excelTemplate/tbl_state_master.csv"
            with open(state_wb) as f:
                reader = csv.reader(f)
                next(reader)
                for row in reader:
                    state_code = row[0]
                    state_name= row[1]
                    if row[2] == '':
                        state_no = None
                    else:
                        state_no = int(row[2])
                    slug = row[3]
                    created_by_id = 1

                    state = State_Master(state_code=state_code,state_name=state_name,state_no=state_no,slug=slug,created_by_id=created_by_id)
                    state.save()

            role = Role_Master(role_code='ORGADMIN',role_desc='Organization Admin',slug='dsaliji1',created_by_id=1)
            role.save()

            country = Country_Master(country_code='IND',country_name='India',flag='in',slug='dsaliji1',created_by_id=1)
            country.save()

            data = {
                "status":"Ok"
            }
            return JsonResponse(data)
    else:
        return redirect(login_url)

def get_queryset_app_ListAPI(request,modelName):
    if request.user.is_authenticated:
        request.session.modified = True
        fullPath = request.get_full_path()
        pathList = fullPath.split("/")
        user = request.user
        ini_dict = request.GET.dict()
        order_field = request.GET.get("order_field")
        order_by = request.GET.get("order_by")
        type = request.GET.get("type")
        org = request.GET.get("org")
        items = ini_dict.items()
        model_criteria = {}
        modelFields = [f.name for f in modelName._meta.get_fields()]
        orderByField = ""
        orderBy = ""
        model_name = modelName.__name__
        UserOrgsList = User.objects.filter(id=user.id).values_list('org_access__id', flat=True)
        if len(ini_dict) > 0:
            for item,value in ini_dict.items():
                if item == 'drpList' or item == 'main_url' or item == 'page_size' or item == 'page' or item == 'org':
                    pass
                elif item == "order_field":
                    orderByField = value
                elif item == "order_by":
                    orderBy = value
                else:
                    if item == 'status' or item == "admin_only":
                        if value == '0' or value == 'false':
                            value = False
                        elif value == '1' or value == 'true':
                            value = True
                        else:
                            value = value
                        model_criteria.update({item:value})
                    elif 'date' in item:
                        date = datetime.strptime(value, "%d-%b-%Y")
                        date_value = date.strftime("%Y-%m-%d")
                        model_criteria.update({item+'__icontains':date_value})
                    else:
                        value = value
                        model_criteria.update({item+'__icontains':value})

        if orderByField != "":
            if orderBy == "asc":
                order_by = orderByField
            else:
                order_by = "-"+str(orderByField)
        else:
            order_by = "-id"

        if request.user.is_admin is True:
            if len(model_criteria)>0:
                return modelName.objects.filter(**model_criteria).order_by(order_by)
            else:
                return modelName.objects.all().order_by(order_by)
        else:
            if 'organisation' in  modelFields:
                if org is None:
                    org = user.organisation
                else:
                    org = Organisation.objects.filter(org_desc=org).first()
                if model_name == 'Organisation':
                    return modelName.objects.filter(**model_criteria).filter(id__in=UserOrgsList).order_by(order_by)
                if model_name == 'User':
                    return modelName.objects.filter(**model_criteria).filter(Q(organisation=org)).order_by(order_by)
                else:
                    if "verification" in fullPath:
                        return modelName.objects.filter(**model_criteria).filter(Q(organisation=org) | Q(organisation__isnull=True)).filter(status="Pending for Verification").order_by(order_by)
                    elif "confirmation" in fullPath:
                        return modelName.objects.filter(**model_criteria).filter(Q(organisation=org) | Q(organisation__isnull=True)).filter(status="Verified").order_by(order_by)
                    else:
                        if "pendingProspectListAPI" in fullPath:
                            return modelName.objects.filter(**model_criteria).filter(Q(organisation=org) | Q(organisation__isnull=True)).filter(status="Pending for Lead").order_by(order_by)
                        else:
                            return modelName.objects.filter(**model_criteria).filter(Q(organisation=org) | Q(organisation__isnull=True)).order_by(order_by)
            else:
                if model_name == 'Organisation':
                    return modelName.objects.filter(**model_criteria).filter(id__in=UserOrgsList).order_by(order_by)
                else:
                    if len(model_criteria) > 0:
                        order_by=order_by
                        return modelName.objects.filter(**model_criteria).order_by(order_by)
                    else:
                        return modelName.objects.all().order_by(order_by)
    else:
        return redirect(login_url)



def get_queryset_app_detailAPI(self,request,form_name):
    if request.user.is_authenticated:
        request.session.modified = True
        previous_url = request.META.get('HTTP_REFERER')
        if previous_url is None:
            context = {
                "form_name": form_name+" Update"
            }
            return render(request, 'build/index.html',context)
        else:
            self.object = self.get_object()
            serializer = self.get_serializer(self.object)
            return Response(serializer.data)
    else:
        return redirect(sign_in)

def redirectURL(request,form_name,type):
    if request.user.is_authenticated:
        request.session.modified = True
        context = {
            "form_name":form_name+" "+type
        }
        return render(request, 'build/index.html',context)
    else:
        return redirect(sign_in)

def listPagePendingApprovalAPI(request):
    if request.user.is_authenticated:
        request.session.modified = True
        doc_id = request.GET.get("doc_id")
        processName = request.GET.get("process")
        process = Process_Master.objects.filter(process_desc=processName).first()
        process_ladder = Process_Ladder.objects.filter(process=process).filter(unq_id=doc_id).all()
        list = []
        for i in process_ladder:
            un = ""
            ul = User.objects.filter(role_access__id=i.role.id)
            for k in ul:
                if ul.count() > 1 and un != "":
                    un = un+", "+k.full_name
                else:
                    un = k.full_name

            data = {
                'role_code' : i.role.role_code,
                'role_desc' : i.role.role_desc,
                'user_name' : un
            }
            list.append(data)
        return JsonResponse(list, safe=False)
    else:
        return redirect(sign_in)


def initialize_context(request):
    context = {}
    error = request.session.pop('flash_error', None)
    if error != None:
        context['errors'] = []
        context['errors'].append(error)
        context['user'] = request.session.get({'user_is_authenticated': False})
        return context

def sign_in(request):
    flow = get_sign_in_flow(request)
    try:
        request.session['auth_flow'] = flow
    except Exception as e:
        return e
    return HttpResponseRedirect(flow['auth_uri'])

def sign_out(request):
    remove_user_and_token(request)
    logout(request)
    context = {
        "message": "You have been logged out!",
    }
    return render(request, 'build/errorPage.html',context)

def callback(request):
    result = get_token_from_code(request)
    user = result['id_token_claims'].get("preferred_username")
    un = User.objects.filter(username=user.casefold()).first()
    if un is None:
        return redirect(Invalid_User)
    un.backend = 'django.contrib.auth.backends.ModelBackend'
    login(request, un)

    return redirect(Home_Page)

#Log Out
def logOut(request):
    logout(request)
    return redirect(login_url)

def invalidUser(request):
    context = {
                "message": "You dont have permission, please contact to system administrator!"
            }
    return render(request, 'build/errorPage.html',context)

def get_csrf(request):
    csrf_cookie = request.COOKIES.get('csrftoken')
    return JsonResponse({"token":csrf_cookie})
