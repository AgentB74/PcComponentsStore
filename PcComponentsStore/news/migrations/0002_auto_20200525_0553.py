# Generated by Django 3.0.3 on 2020-05-25 05:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='news',
            old_name='prod_id',
            new_name='product',
        ),
    ]
