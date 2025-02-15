from rest_framework import serializers
from .models import *

class locationMasterSerializers(serializers.ModelSerializer):
    org_desc = serializers.CharField(source="organisation.org_desc")
    org_selected = serializers.CharField(source="organisation.org_code")
    country = serializers.CharField(source="country.flag")
    updated_by = serializers.CharField(source="updated_by.full_name",allow_null = True)
    my_absolute_url = serializers.SerializerMethodField()

    class Meta:
        model = Location_Master
        fields = '__all__'
        lookup_field = 'slug'

    def get_my_absolute_url(self, obj):
        return obj.get_absolute_url_modify()
