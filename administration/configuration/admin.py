from django.contrib import admin
from .models import *
from appRoot.utils import adminFormFeilds

# Register your models here.
@admin.register(Configuration)
class AdminForm(admin.ModelAdmin):
    field_names = adminFormFeilds(Configuration)
    list_display = field_names
