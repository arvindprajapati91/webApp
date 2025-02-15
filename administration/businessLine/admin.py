from django.contrib import admin
from .models import Business_Line
from appRoot.utils import adminFormFeilds

# Register your models here.
@admin.register(Business_Line)
class AdminForm(admin.ModelAdmin):
    field_names = adminFormFeilds(Business_Line)    
    list_display = field_names
