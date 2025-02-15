from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog
from administration.organisation.models import Organisation
from administration.processMaster.models import Process_Master
from administration.statusMaster.models import Status_Master

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class seriesMasterQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)

class seriesMasterManager(models.Manager):
    def get_queryset(self):
        return seriesMasterQuerySet(self.model, using=self._db)

class Series_Master(models.Model):
    process = models.ForeignKey(Process_Master, null=True, blank=True, on_delete=models.CASCADE)
    status = models.ForeignKey(Status_Master, null=True, blank=True, on_delete=models.CASCADE)
    organisation = models.ForeignKey(Organisation, null=True, blank=True, on_delete=models.CASCADE)
    series_no = models.IntegerField(default=0)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT, related_name='series_master_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='series_saster_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = seriesMasterManager()

    class Meta:
        db_table = "tbl_series_master"
        indexes = [
            models.Index(fields=['process', 'status','series_no','slug'], name='series_main001_idx'),
        ]

    def __str__(self):
        return str(self.status)

    def get_absolute_url_modify(self):
        return reverse(appName+"/seriesMaster:DetailsAPI", kwargs={'slug': self.slug})
