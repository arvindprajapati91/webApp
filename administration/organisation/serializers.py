from rest_framework import serializers
from .models import *
from administration.processMaster.serializers import processMasterSerializers
from administration.roleMaster.serializers import roleMasterManager, roleMasterSerializers

class organisationSerializers(serializers.ModelSerializer):
    country = serializers.CharField(source="country.country_name")
    country_selected = serializers.CharField(source="country.flag")
    state = serializers.CharField(source="state.state_name")
    state_selected = serializers.CharField(source="state.state_code")
    updated_by = serializers.CharField(source="updated_by.full_name",allow_null = True)
    my_absolute_url = serializers.SerializerMethodField()

    class Meta:
        model = Organisation
        fields = '__all__'
        lookup_field = 'slug'

    def get_my_absolute_url(self, obj):
        return obj.get_absolute_url_modify()


# class organisationLadderSerializers(serializers.ModelSerializer):
#     organisation = organisationSerializers()
#     process = processMasterSerializers()
#     role = roleMasterSerializers()

#     class Meta:
#         model = Organisation_Ladder
#         fields = '__all__'
#         lookup_field = 'slug'

#     def get_my_absolute_url(self, obj):
#         return obj.get_absolute_url_modify()
