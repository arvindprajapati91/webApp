from django.contrib import admin
from .models import Menu_Master
from appRoot.utils import adminFormFeilds

# Register your models here.
@admin.register(Menu_Master)
class AdminForm(admin.ModelAdmin):
    field_names = adminFormFeilds(Menu_Master)
    list_display = field_names
