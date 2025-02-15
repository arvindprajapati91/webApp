from django.contrib import admin
from .models import *
from appRoot.utils import adminFormFeilds

# Register your models here.
@admin.register(Series_Master)
class AdminForm(admin.ModelAdmin):
    field_names = adminFormFeilds(Series_Master)    
    list_display = field_names
