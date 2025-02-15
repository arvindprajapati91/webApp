from django.contrib import admin
from .models import *
from appRoot.utils import adminFormFeilds

# Register your models here.
@admin.register(Audit_Trail)
class AdminForm(admin.ModelAdmin):
    field_names = adminFormFeilds(Audit_Trail)
    list_display = field_names
