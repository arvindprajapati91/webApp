from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class statusMasterQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)


class statusMasterManager(models.Manager):
    def get_queryset(self):
        return statusMasterQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'process_desc':
            lookups = (Q(bl_desc__icontains=query))
        return self.filter(lookups).distinct()

class Status_Master(models.Model):
    status_desc = models.CharField(max_length=500, blank=True, null=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT, related_name='status_master_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='status_master_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = statusMasterManager()

    class Meta:
        db_table = "tbl_status"
        indexes = [
            models.Index(fields=['status_desc','slug'], name='status_main001_idx'),
        ]


    def __str__(self):
        return str(self.status_desc)

    def get_absolute_url_modify(self):
        return reverse(appName+"/statusMaster:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Status_Master)