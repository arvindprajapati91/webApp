from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class stateMasterQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)

class stateMasterManager(models.Manager):
    def get_queryset(self):
        return stateMasterQuerySet(self.model, using=self._db)

class State_Master(models.Model):
    state_code = models.CharField(max_length=2, blank=True, null=True)
    state_name = models.CharField(max_length=50, blank=True, null=True)
    state_no = models.IntegerField(blank=True, null=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT, related_name='state_master_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='state_saster_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = stateMasterManager()

    class Meta:
        db_table = "tbl_state_master"
        indexes = [
            models.Index(fields=['state_code', 'state_name','state_no', 'slug'], name='state_main001_idx'),
        ]

    def __str__(self):
        return str(self.state_code)

    def get_absolute_url_modify(self):
        return reverse(appName+"/stateMaster:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(State_Master)