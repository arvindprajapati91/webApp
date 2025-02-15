from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog
from administration.countryMaster.models import Country_Master
from administration.processMaster.models import Process_Master
from administration.stateMaster.models import State_Master

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class organisationQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)


class organisationManager(models.Manager):
    def get_queryset(self):
        return organisationQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'org_code':
            lookups = (Q(bl_code__icontains=query))
        if self_query == 'org_desc':
            lookups = (Q(bl_desc__icontains=query))
        return self.filter(lookups).distinct()

class Organisation(models.Model):
    org_code = models.CharField(max_length=10, blank=True, null=True)
    org_desc = models.CharField(max_length=500, blank=True, null=True)
    short_name = models.CharField(max_length=10, blank=True, null=True)
    country = models.ForeignKey(Country_Master, null=True,blank=True, on_delete=models.CASCADE,related_name='org_country')
    address_1 = models.TextField()
    address_2 = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    state = models.ForeignKey(State_Master, null=True,blank=True, on_delete=models.CASCADE,related_name='org_state_master')
    zip_code = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    fax = models.CharField(max_length=50, blank=True, null=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT, related_name='organisation_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='organisation_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = organisationManager()

    class Meta:
        db_table = "tbl_organisation"
        indexes = [
            models.Index(fields=['org_code', 'org_desc','country','city','state','zip_code','slug'], name='org_main001_idx'),
        ]

    def __str__(self):
        return str(self.org_desc)

    def get_absolute_url_modify(self):
        return reverse(appName+"/organisation:DetailsAPI", kwargs={'slug': self.slug})

class organisationLadderQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)

class organisationLadderManager(models.Manager):
    def get_queryset(self):
        return organisationLadderQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'organisation_id':
            lookups = (Q(organisation_id__icontains=query))
        return self.filter(lookups).distinct()


auditlog.register(Organisation)
