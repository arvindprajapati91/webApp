from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class countryMasterQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)

class countryMasterManager(models.Manager):
    def get_queryset(self):
        return countryMasterQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'country_code':
            lookups = (Q(country_code_icontains=query))
        if self_query == 'country_name':
            lookups = (Q(country_name__icontains=query))
        return self.filter(lookups).distinct()

class Country_Master(models.Model):
    country_code = models.CharField(max_length=10, blank=True, null=True)
    country_name = models.CharField(max_length=500, blank=True, null=True)
    flag = models.CharField(max_length=10, blank=True, null=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT, related_name='country_master_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='country_master_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = countryMasterManager()

    class Meta:
        db_table = "tbl_country_master"
        indexes = [
            models.Index(fields=['country_code', 'country_name','slug'], name='contry_main001_idx'),
        ]

    def __str__(self):
        return str(self.country_name)

    def get_absolute_url_modify(self):
        return reverse(appName+"/countryMaster:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Country_Master)