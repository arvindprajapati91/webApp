from django.contrib import admin
from .models import Process_Master
from appRoot.utils import adminFormFeilds

# Register your models here.
@admin.register(Process_Master)
class AdminForm(admin.ModelAdmin):
    field_names = adminFormFeilds(Process_Master)
    list_display = field_names
