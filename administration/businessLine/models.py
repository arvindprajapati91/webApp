from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog
from administration.organisation.models import Organisation


User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class businessLineQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)


class businessLineManager(models.Manager):
    def get_queryset(self):
        return businessLineQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'bl_code':
            lookups = (Q(bl_code_icontains=query))
        if self_query == 'bl_desc':
            lookups = (Q(bl_desc__icontains=query))
        return self.filter(lookups).distinct()

class Business_Line(models.Model):
    bl_code = models.CharField(max_length=10, blank=True, null=True)
    bl_desc = models.CharField(max_length=500, blank=True, null=True)
    organisation = models.ForeignKey(Organisation,null=True, blank=True, on_delete=models.CASCADE, related_name='bl_org')
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='business_line_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='business_line_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = businessLineManager()

    class Meta:
        db_table = "tbl_business_line"
        indexes = [
            models.Index(fields=['bl_code', 'bl_desc','slug'], name='bl_main001_idx'),
        ]

    def __str__(self):
        return str(self.bl_desc)

    def get_absolute_url_modify(self):
        return reverse(appName+"/businessLine:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Business_Line)