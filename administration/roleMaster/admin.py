from django.contrib import admin
from .models import Role_Master
from appRoot.utils import adminFormFeilds

# Register your models here.
@admin.register(Role_Master)
class AdminForm(admin.ModelAdmin):
    field_names = adminFormFeilds(Role_Master)
    list_display = field_names
