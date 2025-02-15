# Generated by Django 5.0 on 2024-01-07 15:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auditTrail', '0001_initial'),
        ('processMaster', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='audit_trail',
            name='action_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='audit_trail_created_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='audit_trail',
            name='process',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='audit_trail_process', to='processMaster.process_master'),
        ),
        migrations.AddIndex(
            model_name='audit_trail',
            index=models.Index(fields=['process', 'unq_id', 'action_desc', 'changes'], name='at_main001_idx'),
        ),
    ]
