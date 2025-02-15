from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView,RetrieveAPIView
from django.http import JsonResponse
from appRoot.views import LargeResultsSetPagination, get_queryset_app_ListAPI, get_queryset_app_detailAPI, redirectURL
from appRoot.utils import download_excel_data

# Create your views here.
User = get_user_model()
modelName = Audit_Trail
appName =  settings.APP_NAME
login_url = '/'
form_name = "Audit Trail"

def auditTrailList(request):
    return redirectURL(request,form_name,type="List")

# class auditTrailListAPI(ListAPIView):
#     serializer_class = auditTrailSerializers
#     pagination_class = LargeResultsSetPagination
#     def get_queryset(self):
#         return get_queryset_app_ListAPI (self.request,modelName=modelName)

# class auditTrailDetailsAPI(RetrieveAPIView):
#     queryset = Audit_Trail.objects.all()
#     serializer_class = auditTrailSerializers
#     lookup_field = 'slug'

#     def retrieve(self, request, *args, **kwargs):
#         return get_queryset_app_detailAPI(self,request,form_name)


class auditTrailViewAPI(ListAPIView):
    serializer_class = auditTrailView
    pagination_class = LargeResultsSetPagination
    def get_queryset(self):
        request = self.request
        record_no = request.GET.get('record_no')
        table_name = request.GET.get('table_name')
        qs = modelName.objects.filter(table_name=table_name).filter(record_no=record_no).order_by('-action_date').all()
        return qs


def downloadAuditTrail(request):
    mdelName = modelName
    sheetName = "RPT_Audit_Trail"
    wbName = "RPT_Audit_Trail"
    return download_excel_data(request,mdelName,sheetName,wbName)

# class auditTrailDetailsAPI(RetrieveAPIView):
#     queryset = modelName.objects.all()
#     serializer_class = auditTrailSerializers
#     lookup_field = 'slug'

#     def retrieve(self, request, *args, **kwargs):
#         return get_queryset_app_detailAPI(self,request,form_name)

# def auditTrailCreateUpdate(request):
#     return redirectURL(request,form_name,type="Create")

# # Create Update Function
# @transaction.atomic
# @catch_exceptions
# def auditTrailCreateUpdateAPI(request):
#     if request.user.is_authenticated:
#         request.session.modified = True
#         if request.method == "POST":
#             body_data = json.loads(request.body.decode("utf-8"))
#             bl_code = body_data['bl_code']
#             bl_desc = body_data['bl_desc']

#             obj_id = body_data['obj_id']
#             if obj_id == "":
#                 obj_id = None
#             else:
#                 obj_id = obj_id
#             bl_code = modelName.objects.filter(bl_code=bl_code).exclude(id=obj_id).first()
#             if bl_code:
#                 data = {
#                     "error_msg": "'"+bl_code.bl_code+"' code is already available!"
#                 }
#                 return JsonResponse(data)
#             bl_desc = modelName.objects.filter(bl_desc=bl_desc).exclude(id=obj_id).first()
#             if bl_desc:
#                 data = {
#                     "error_msg": "'"+bl_desc.bl_desc+"' BL name is already available!"
#                 }
#                 return JsonResponse(data)

#             field_names = [f.name for f in modelName._meta.get_fields()]
#             obj, created  = modelName.objects.get_or_create(pk=obj_id)
#             objSave(request, obj, body_data, obj_id, field_names)

#             data = {
#                 "status":"Ok"
#             }
#             return JsonResponse(data)
#     else:
#         return

def transaction_audit_trail_view(request):
    if request.user.is_authenticated:
        request.session.modified = True
        doc_id = request.GET.get("doc_id")
        processName = request.GET.get("process")
        process = Process_Master.objects.filter(process_desc=processName).first()
        auditTrail = Audit_Trail.objects.filter(process=process).filter(unq_id=doc_id).order_by('-action_date').all()
        list = []
        for i in auditTrail:
            data = {
                'user_name' : i.action_by.full_name,
                'action_desc' : i.action_desc,
                'action_date' : i.action_date,
                'comments' : i.comments,
            }
            list.append(data)
        return JsonResponse(list, safe=False)
    else:
        return