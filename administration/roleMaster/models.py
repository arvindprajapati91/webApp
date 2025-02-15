from django.db import models
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from administration.menuMaster.models import Menu_Master
from auditlog.registry import auditlog
from administration.organisation.models import Organisation

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

class roleMasterQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)

class roleMasterManager(models.Manager):
    def get_queryset(self):
        return roleMasterQuerySet(self.model, using=self._db)

    def search(self, query, self_query, search):
        if self_query == 'role_code':
            lookups = (Q(role_code__icontains=query))
        if self_query == 'role_desc':
            lookups = (Q(role_desc__icontains=query))
        return self.filter(lookups).distinct()

class Role_Master(models.Model):
    role_code = models.CharField(max_length=10, blank=True, null=True)
    role_desc = models.CharField(max_length=500, blank=True, null=True)
    organisation = models.ForeignKey(Organisation,null=True, blank=True, on_delete=models.CASCADE, related_name='role_org')
    menu_access = models.ManyToManyField(Menu_Master,blank=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='rm_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='rm_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    objects = roleMasterManager()

    class Meta:
        db_table = "tbl_role_master"
        indexes = [
            models.Index(fields=['role_code', 'role_desc','slug'], name='role_main001_idx'),
        ]

    def __str__(self):
        return str(self.role_desc)

    def get_absolute_url_modify(self):
        return reverse(appName+"/roleMaster:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Role_Master)