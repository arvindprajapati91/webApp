from rest_framework import serializers
from .models import *

class auditTrailView(serializers.ModelSerializer):
    process = serializers.CharField(source="process.process_desc",allow_null = True)  
    class Meta:
        model = Audit_Trail
        fields = '__all__'
