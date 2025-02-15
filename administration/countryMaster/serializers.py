from rest_framework import serializers
from .models import *

class countryMasterSerializers(serializers.ModelSerializer):
    updated_by = serializers.CharField(source="updated_by.full_name",allow_null = True) 
    my_absolute_url = serializers.SerializerMethodField()
        
    class Meta:
        model = Country_Master
        fields = '__all__'
        lookup_field = 'slug'

    def get_my_absolute_url(self, obj):
        return obj.get_absolute_url_modify()
