from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog

from administration.organisation.models import Organisation
from administration.processMaster.models import Process_Master

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class prospectQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)

class prospectManager(models.Manager):
    def get_queryset(self):
        return prospectQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'prospect_number':
            lookups = (Q(prospect_number_icontains=query))
        if self_query == 'firstName':
            lookups = (Q(firstName__icontains=query))
        return self.filter(lookups).distinct()

class Prospect(models.Model):
    prospect_number = models.CharField(max_length=20, blank=True, null=True)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=100, blank=True, null=True)
    interested_in = models.TextField()
    organisation = models.ForeignKey(Organisation,null=True, blank=True, on_delete=models.CASCADE, related_name='prospect_org')
    channel_mode = models.CharField(max_length=100, blank=True, null=True)
    mode_of_communication = models.CharField(max_length=100, blank=True, null=True)
    process = models.ForeignKey(Process_Master, null=True, blank=True, on_delete=models.CASCADE, related_name='prospect_process')
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='prospect_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='prospect_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = prospectManager()

    class Meta:
        db_table = "tbl_prospect"
        indexes = [
            models.Index(fields=['prospect_number', 'first_name','email','phone','type','slug'], name='psp_main001_idx'),
        ]

    def __str__(self):
        return str(self.prospect_number)

    def get_absolute_url_modify(self):
        return reverse(appName+"/prospect:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Prospect)