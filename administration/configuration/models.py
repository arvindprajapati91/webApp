from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class configurationQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)

class configurationManager(models.Manager):
    def get_queryset(self):
        return configurationQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'configuration':
            lookups = (Q(configuration_icontains=query))
        if self_query == 'value':
            lookups = (Q(value__icontains=query))
        return self.filter(lookups).distinct()

class Configuration(models.Model):
    configuration = models.CharField(max_length=50, blank=True, null=True)
    value = models.CharField(max_length=500, blank=True, null=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT, related_name='configuration_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='configuration_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = configurationManager()

    class Meta:
        db_table = "tbl_configuration"
        indexes = [
            models.Index(fields=['configuration', 'value','slug'], name='config_main001_idx'),
        ]

    def __str__(self):
        return str(self.configuration)

    def get_absolute_url_modify(self):
        return reverse(appName+"/configuration:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Configuration)