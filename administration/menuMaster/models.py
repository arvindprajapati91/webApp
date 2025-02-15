from django.db import models
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.db.models import Q
from django.conf import settings
from auditlog.registry import auditlog

User = settings.AUTH_USER_MODEL
appName = settings.APP_NAME

# Create your models here.
class menuMasterQuerySet(models.query.QuerySet):
    def status(self):
        return self.filter(status=True)

    def parent_menu(self):
        return self.filter(is_parent=True)


class menuMasterManager(models.Manager):
    def get_queryset(self):
        return menuMasterQuerySet(self.model, using=self._db)

    def search(self,query, self_query,search):
        if self_query == 'menu_desc':
            lookups = (Q(menu_desc__icontains=query))
        return self.filter(lookups).distinct()

class Menu_Master(models.Model):
    menu_desc = models.CharField(max_length=500, blank=True, null=True)
    is_parent = models.BooleanField(default=True)
    menu_url = models.CharField(max_length=500, blank=True, null=True)
    parent_icon = models.TextField(blank=True, null=True)
    app_folder = models.TextField(blank=True, null=True)
    parent_menu = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    order_level = models.DecimalField(max_digits=3, decimal_places=1,null=True, blank=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT, related_name='menu_master_created_by')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, null=True, blank=True,on_delete=models.CASCADE, related_name='menu_master_updated_by')
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    folder_size = models.IntegerField(default=1)
    admin_only = models.BooleanField(default=False)
    objects = menuMasterManager()

    class Meta:
        db_table = "tbl_menu_master"
        indexes = [
            models.Index(fields=['menu_desc', 'is_parent','menu_url','order_level','slug'], name='menu_main001_idx'),
        ]

    def __str__(self):
        return str(self.menu_desc)

    def get_absolute_url_modify(self):
        return reverse(appName+"/menuMaster:DetailsAPI", kwargs={'slug': self.slug})

auditlog.register(Menu_Master)