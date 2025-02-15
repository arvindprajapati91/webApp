from rest_framework import serializers
from .models import *

class businessLineSerializers(serializers.ModelSerializer):
    org_desc = serializers.CharField(source="organisation.org_desc",allow_null = True)
    org_selected = serializers.CharField(source="organisation.org_code",allow_null = True)
    updated_by = serializers.CharField(source="updated_by.full_name",allow_null = True)
    my_absolute_url = serializers.SerializerMethodField()

    class Meta:
        model = Business_Line
        fields = '__all__'
        lookup_field = 'slug'

    def get_my_absolute_url(self, obj):
        return obj.get_absolute_url_modify()
