from django.contrib import admin
from .models import Country_Master
from appRoot.utils import adminFormFeilds

# Register your models here.
@admin.register(Country_Master)
class AdminForm(admin.ModelAdmin):
    field_names = adminFormFeilds(Country_Master)
    list_display = field_names
