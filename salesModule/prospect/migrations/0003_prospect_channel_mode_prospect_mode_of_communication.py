# Generated by Django 5.1.6 on 2025-02-15 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prospect', '0002_remove_prospect_psp_main001_idx_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='prospect',
            name='channel_mode',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='prospect',
            name='mode_of_communication',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
