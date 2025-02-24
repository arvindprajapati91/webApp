# Generated by Django 5.0 on 2024-01-07 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Menu_Master',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('menu_desc', models.CharField(blank=True, max_length=500, null=True)),
                ('is_parent', models.BooleanField(default=True)),
                ('menu_url', models.CharField(blank=True, max_length=500, null=True)),
                ('parent_icon', models.TextField(blank=True, null=True)),
                ('app_folder', models.TextField(blank=True, null=True)),
                ('order_level', models.DecimalField(blank=True, decimal_places=1, max_digits=3, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('status', models.BooleanField(default=True)),
                ('slug', models.CharField(blank=True, max_length=20, null=True)),
                ('folder_size', models.IntegerField(default=1)),
            ],
            options={
                'db_table': 'tbl_menu_master',
            },
        ),
    ]
