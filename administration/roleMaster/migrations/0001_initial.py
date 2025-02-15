# Generated by Django 5.0 on 2024-01-07 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Role_Master',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role_code', models.CharField(blank=True, max_length=10, null=True)),
                ('role_desc', models.CharField(blank=True, max_length=500, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('status', models.BooleanField(default=True)),
                ('slug', models.CharField(blank=True, max_length=20, null=True)),
            ],
            options={
                'db_table': 'tbl_role_master',
            },
        ),
    ]
