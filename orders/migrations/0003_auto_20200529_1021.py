# Generated by Django 3.0.3 on 2020-05-29 10:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20200529_1014'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='orderstatus',
            unique_together=set(),
        ),
    ]
