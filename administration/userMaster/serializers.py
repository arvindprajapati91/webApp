from rest_framework import serializers
from .models import *
from administration.organisation.serializers import organisationSerializers
from administration.locationMaster.serializers import locationMasterSerializers
from administration.businessLine.serializers import businessLineSerializers
from administration.departmentMaster.serializers import departmentMasterSerializers
from administration.roleMaster.serializers import roleMasterSerializers

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class userMasterSerializers(serializers.ModelSerializer):
    org_desc = serializers.CharField(source="organisation.org_desc",allow_null = True)
    org_selected = serializers.CharField(source="organisation.org_code",allow_null = True)
    reporting_manager = serializers.CharField(source="reporting_manager.full_name",allow_null = True)
    organisation = organisationSerializers(read_only=True,allow_null = True)
    business_line = businessLineSerializers(read_only=True,allow_null = True)
    location = locationMasterSerializers(read_only=True,allow_null = True)
    department = departmentMasterSerializers(read_only=True,allow_null = True)
    updated_by = serializers.CharField(source="updated_by.full_name",allow_null = True)
    my_absolute_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'
        lookup_field = 'slug'

    def get_my_absolute_url(self, obj):
        return obj.get_absolute_url_modify()

class userMasterAuditTrailView(serializers.ModelSerializer):
    class Meta:
        model = User_Master_Audit_Trail_View
        fields = '__all__'
