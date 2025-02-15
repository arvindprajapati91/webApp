from django.contrib import admin
from .models import *
from appRoot.utils import adminFormFeilds

# Register your models here.
@admin.register(Organisation)
class AdminForm(admin.ModelAdmin):
    field_names = adminFormFeilds(Organisation)
    list_display = field_names
