from rest_framework import serializers
from .models import *
from administration.processMaster.serializers import processMasterSerializers
from administration.statusMaster.serializers import statusMasterSerializers

class seriesMasterSerializers(serializers.ModelSerializer):
    updated_by = serializers.CharField(source="updated_by.full_name",allow_null = True)
    my_absolute_url = serializers.SerializerMethodField()
    process = serializers.CharField(source="process.process_desc",allow_null = True)
    organisation = serializers.CharField(source="organisation.id",allow_null = True)
    status = serializers.CharField(source="status.status_desc",allow_null = True)

    class Meta:
        model = Series_Master
        fields = '__all__'
        lookup_field = 'slug'

    def get_my_absolute_url(self, obj):
        return obj.get_absolute_url_modify()
