# Generated by Django 5.1.6 on 2025-02-15 08:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('prospect', '0004_remove_prospect_contact_method'),
    ]

    operations = [
        migrations.RenameField(
            model_name='prospect',
            old_name='intrested_in',
            new_name='interested_in',
        ),
    ]
