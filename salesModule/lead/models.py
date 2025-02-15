from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog
from administration.organisation.models import Organisation
from administration.processMaster.models import Process_Master
from salesModule.prospect.models import Prospect

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class leadQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)

class leadManager(models.Manager):
    def get_queryset(self):
        return leadQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'lead_number':
            lookups = (Q(lead_number_icontains=query))
        if self_query == 'firstName':
            lookups = (Q(firstName__icontains=query))
        return self.filter(lookups).distinct()

class Lead(models.Model):
    prospect_number = models.ForeignKey(Prospect,null=True, blank=True, on_delete=models.CASCADE, related_name='lead_prospect')
    lead_number = models.CharField(max_length=20, blank=True, null=True)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=100, blank=True, null=True)
    interested_in = models.TextField()
    organisation = models.ForeignKey(Organisation,null=True, blank=True, on_delete=models.CASCADE, related_name='lead_org')
    channel_mode = models.CharField(max_length=100, blank=True, null=True)
    mode_of_communication = models.CharField(max_length=100, blank=True, null=True)
    process = models.ForeignKey(Process_Master, null=True, blank=True, on_delete=models.CASCADE, related_name='lead_process')
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='lead_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='lead_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = leadManager()

    class Meta:
        db_table = "tbl_lead"
        indexes = [
            models.Index(fields=['lead_number', 'first_name','email','phone','type','slug'], name='lead_main001_idx'),
        ]

    def __str__(self):
        return str(self.lead_number)

    def get_absolute_url_modify(self):
        return reverse(appName+"/lead:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Lead)

# ('new', 'New'),
#         ('contacted', 'Contacted'),
#         ('qualified', 'Qualified'),
#         ('lost', 'Lost'),
#         ('won', 'Won')