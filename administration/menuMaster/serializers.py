from rest_framework import serializers
from .models import *

class menuMasterSerializers(serializers.ModelSerializer):
    updated_by = serializers.CharField(source="updated_by.full_name",allow_null = True)    
    parent_name = serializers.CharField(source='parent_menu.menu_desc', allow_null=True)
    parent_app_folder = serializers.CharField(source='parent_menu.app_folder', allow_null=True)
    my_absolute_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Menu_Master
        fields = '__all__'
        lookup_field = 'slug'

    def get_my_absolute_url(self, obj):
        return obj.get_absolute_url_modify()


class parentMenuMasterSerializers(serializers.ModelSerializer):    
    class Meta:
        model = Menu_Master
        fields = '__all__'     
        
