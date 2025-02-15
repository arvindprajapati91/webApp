from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog
from django.contrib.auth import get_user_model

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class processMasterQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)


class processMasterManager(models.Manager):
    def get_queryset(self):
        return processMasterQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'process_desc':
            lookups = (Q(bl_desc__icontains=query))
        return self.filter(lookups).distinct()

class Process_Master(models.Model):
    process_desc = models.CharField(max_length=500, blank=True, null=True)
    type = models.CharField(max_length=1, blank=True, null=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT, related_name='process_master_created_by',db_constraint=False)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='process_master_updated_by',db_constraint=False)
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = processMasterManager()

    class Meta:
        db_table = "tbl_process"
        indexes = [
            models.Index(fields=['process_desc', 'type','slug'], name='process_main001_idx'),
        ]

    def __str__(self):
        return str(self.process_desc)

    def get_absolute_url_modify(self):
        return reverse(appName+"/processMaster:DetailsAPI", kwargs={'slug': self.slug})

class Process_Ladder(models.Model):
    unq_id = models.IntegerField(null=True)
    process = models.ForeignKey(Process_Master,null=True, blank=True, on_delete=models.CASCADE)
    approval_order = models.IntegerField(default=0)
    approval_limit = models.IntegerField(default=0)

    class Meta:
        db_table = "tbl_process_ladder"

auditlog.register(Process_Master)