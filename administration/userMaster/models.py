from ast import Or
from django.db import models
from django.conf import settings
from django.db.models import Q
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
from django.urls import reverse
from auditlog.models import AuditlogHistoryField
from auditlog.registry import auditlog
from django.contrib.auth import get_user_model
from administration.roleMaster.models import Role_Master
from administration.processMaster.models import Process_Master
from administration.organisation.models import Organisation as Org
from administration.businessLine.models import Business_Line as BL
from administration.locationMaster.models import Location_Master as Loc
from administration.departmentMaster.models import Department_Master as Dep

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, username, full_name, password=None, is_active=True, is_staff=False, is_admin=False):

        if not password:
                raise ValueError("Users must have a password")
        if not username:
                raise ValueError("Users must have a username number")
        if not full_name:
                raise ValueError("Users must have a full name")

        user_obj = self.model(
                email = self.normalize_email(email)
        )
        user_obj.set_password(password) # change user password
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.status = is_active
        user_obj.username = username
        user_obj.full_name = full_name
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, username, full_name, password=None):
        user = self.create_user(
                email=email,
                password=password,
                username=username,
                full_name = full_name,
                is_staff=True
        )
        return user

    def create_superuser(self, email, username, full_name, password=None):
        user = self.create_user(
                email=email,
                password=password,
                username=username,
                full_name = full_name,
                is_staff=True,
                is_admin=True
        )
        return user

    def search(self,query, self_query,search):
        if self_query == 'username':
                lookups = (Q(username__icontains=query))
        if self_query == 'full_name':
                lookups = (Q(full_name__icontains=query))
        if self_query == 'email':
                lookups = (Q(email__icontains=query))
        return self.filter(lookups).distinct()


class User(AbstractBaseUser):
    history = AuditlogHistoryField()
    username    = models.CharField(max_length=255, unique=True)
    email       = models.EmailField(max_length=255, unique=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    status      = models.BooleanField(default=True) # can login
    staff       = models.BooleanField(default=False) # staff user non superuser
    admin       = models.BooleanField(default=False) # superuser
    no_attemp   = models.IntegerField(default=0)
    otp         = models.IntegerField(default=0)
    is_lock     = models.BooleanField(default=False)
    employee_code = models.CharField(max_length=10, unique=True,null=True, blank=True)
    reporting_manager = models.ForeignKey('self',null=True, blank=True, on_delete=models.PROTECT, related_name='user_reporting_manager')
    created_by      = models.ForeignKey('self',null=True, blank=True, on_delete=models.PROTECT, related_name='user_created_by')
    created_date    = models.DateTimeField(auto_now_add=True)
    updated_by     = models.ForeignKey('self',null=True, blank=True, on_delete=models.CASCADE, related_name='user_modified_by')
    modified_date = models.DateTimeField(auto_now=True)
    slug = models.CharField(max_length=20, blank=True, null=True)
    role_access = models.ManyToManyField(Role_Master,blank=True, related_name='role_access')
    process = models.ForeignKey(Process_Master,null=True, blank=True, on_delete=models.CASCADE, related_name='process_master_user')
    organisation = models.ForeignKey(Org,null=True, blank=True, on_delete=models.CASCADE, related_name='org_user')
    business_line = models.ForeignKey(BL,null=True, blank=True, on_delete=models.CASCADE, related_name='bl_user')
    location = models.ForeignKey(Loc,null=True, blank=True, on_delete=models.CASCADE, related_name='loc_user')
    department = models.ForeignKey(Dep,null=True, blank=True, on_delete=models.CASCADE, related_name='dep_user')
    org_access = models.ManyToManyField(Org,blank=True, related_name='org_access')
    bl_access = models.ManyToManyField(BL,blank=True, related_name='bl_access')
    dep_access = models.ManyToManyField(Dep,blank=True, related_name='dep_access')
    loc_access = models.ManyToManyField(Loc,blank=True, related_name='loc_access')


    class Meta:
        db_table = 'tbl_user_master'
        indexes = [
            models.Index(fields=['username','email','full_name','employee_code', 'slug'], name='user_main001_idx'),
        ]

    USERNAME_FIELD = 'username' #username
    # USERNAME_FIELD and password are required by default
    REQUIRED_FIELDS = ['full_name','email'] #python manage.py createsuperuser

    objects = UserManager()

    def _str_(self):
        return self.full_name

    def get_full_name(self):
        return self.full_name

    def get_short_name(self):
        return self.email

    @property
    def is_staff(self):
        "This will perform get, set and del of staff"
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_active(self):
        return self.status


    #solves error of has_module_perms
    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def get_absolute_url_modify(self):
        return reverse(settings.APP_NAME + "/userMaster:DetailsAPI", kwargs={'slug': self.slug})

class User_Master_Audit_Trail_View(models.Model):
    id = models.BigIntegerField(primary_key=True)
    unq_id = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100)
    slug = models.CharField(max_length=100)
    process_id = models.CharField(max_length=100)
    process_desc = models.CharField(max_length=100)
    action_desc = models.CharField(max_length=30)
    changes = models.TextField()
    action_by_id = models.CharField(max_length=100)
    action_by = models.CharField(max_length=30)
    action_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = "vw_user_master_audit_trail"

auditlog.register(User)
auditlog.register(User.role_access.through)
auditlog.register(User.org_access.through)
auditlog.register(User.bl_access.through)
auditlog.register(User.dep_access.through)
auditlog.register(User.loc_access.through)