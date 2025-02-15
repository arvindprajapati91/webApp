from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserAdminChangeForm, UserAdminCreationForm
from appRoot.utils import adminFormFeilds

User = get_user_model()

# Register your models here.

class UserAdmin(BaseUserAdmin):
    # the forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    # The fields to be used in displaying the User Model
    # These override the definations on the base UserAdmin
    # that referene specific fields on auth.User
    list_display = adminFormFeilds(User)
    list_filter = ('admin','staff','status')
    fieldsets = (
        (None, {
            "fields": ('username','full_name','email','password')}),
            ('Permissions',{'fields':('admin','staff','status')})
    )

    # add_fieldsets is not a standard ModelAdmin attribut. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user
    add_fieldsets = (
        (None,{
            'classes':('wide',),
            'fields':('username','full_name','email','password1','password2')
        })
    )

    search_fields = ('username','email','full_name')
    ordering = ('username',)
    filter_horizontal =()

admin.site.register(User,UserAdmin)
# Remove Group Model from admin. We're not using it
admin.site.unregister(Group)
