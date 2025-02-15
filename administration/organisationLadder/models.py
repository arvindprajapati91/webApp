from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog
from administration.organisation.models import Organisation
from administration.processMaster.models import Process_Master
from administration.roleMaster.models import Role_Master

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

class Organisation_Ladder(models.Model):
    organisation = models.ForeignKey(Organisation, null=True, blank=True, on_delete=models.CASCADE)
    process = models.ForeignKey(Process_Master, null=True, blank=True, on_delete=models.CASCADE)
    role = models.ForeignKey(Role_Master, null=True, blank=True, on_delete=models.CASCADE, related_name='organisation_ladder_role')
    approval_order = models.IntegerField(default=0)
    approval_limit = models.IntegerField(default=0)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT, related_name='organisation_ladder_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='organisation_ladder_updated_by')
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "tbl_organisation_ladder"
        indexes = [
            models.Index(fields=['organisation', 'process','role','approval_order','approval_limit'], name='org_ldr_main001_idx'),
        ]



auditlog.register(Organisation_Ladder)