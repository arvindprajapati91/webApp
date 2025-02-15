from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog

from administration.countryMaster.models import Country_Master
from administration.organisation.models import Organisation


User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class locationMasterQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)


class locationMasterManager(models.Manager):
    def get_queryset(self):
        return locationMasterQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'loc_code':
            lookups = (Q(bl_code_icontains=query))
        if self_query == 'loc_desc':
            lookups = (Q(bl_desc__icontains=query))
        return self.filter(lookups).distinct()

class Location_Master(models.Model):
    loc_code = models.CharField(max_length=20, blank=True, null=True)
    loc_desc = models.CharField(max_length=500, blank=True, null=True)
    organisation = models.ForeignKey(Organisation,null=True, blank=True, on_delete=models.CASCADE, related_name='loc_org')
    country = models.ForeignKey(Country_Master, null=True,blank=True, on_delete=models.CASCADE,related_name='loc_country')
    address_1 = models.TextField()
    address_2 = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    zip_code = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    fax = models.CharField(max_length=50, blank=True, null=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='loc_master_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='loc_master_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = locationMasterManager()

    class Meta:
        db_table = "tbl_location_master"
        indexes = [
            models.Index(fields=['loc_code', 'loc_desc','country','city','state','zip_code','slug'], name='lm_main001_idx'),
        ]

    def __str__(self):
        return str(self.loc_desc)

    def get_absolute_url_modify(self):
        return reverse(appName+"/locationMaster:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Location_Master)