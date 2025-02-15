from django.db import models
from django_db_views.db_view import DBView
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog
from administration.processMaster.models import Process_Master

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class auditTrailQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)


class auditTrailManager(models.Manager):
    def get_queryset(self):
        return auditTrailQuerySet(self.model, using=self._db)

class Audit_Trail(models.Model):
    process = models.ForeignKey(Process_Master,null=True, blank=True, on_delete=models.CASCADE, related_name='audit_trail_process')
    unq_id = models.IntegerField(null=True)
    action_desc = models.TextField(blank=True, null=True)
    changes = models.TextField(blank=True, null=True)
    comments = models.TextField(blank=True, null=True)
    action_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT, related_name='audit_trail_created_by')
    action_date = models.DateTimeField(auto_now_add=True)
    table_name = models.TextField(blank=True, null=True)
    record_no = models.TextField(blank=True, null=True)
    objects = auditTrailManager()

    class Meta:
        db_table = "tbl_audit_trail"
        indexes = [
            models.Index(fields=['process', 'unq_id','action_desc','changes'], name='at_main001_idx'),
        ]

    def __str__(self):
        return str(self.action_desc)

    def get_absolute_url_modify(self):
        return reverse(appName+"/auditTrail:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Audit_Trail)
