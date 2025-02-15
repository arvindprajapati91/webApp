from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog
from administration.organisation.models import Organisation


User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class departmentMasterQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)


class departmentMasterManager(models.Manager):
    def get_queryset(self):
        return departmentMasterQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'dep_code':
            lookups = (Q(dep_code_icontains=query))
        if self_query == 'dep_desc':
            lookups = (Q(dep_desc__icontains=query))
        return self.filter(lookups).distinct()

class Department_Master(models.Model):
    dep_code = models.CharField(max_length=10, blank=True, null=True)
    dep_desc = models.CharField(max_length=500, blank=True, null=True)
    organisation = models.ForeignKey(Organisation,null=True, blank=True, on_delete=models.CASCADE, related_name='dep_org')
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='dep_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='dep_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = departmentMasterManager()

    class Meta:
        db_table = "tbl_department_master"
        indexes = [
            models.Index(fields=['dep_code', 'dep_desc','slug'], name='dep_main001_idx'),
        ]

    def __str__(self):
        return str(self.dep_desc)

    def get_absolute_url_modify(self):
        return reverse(appName+"/departmentMaster:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Department_Master)