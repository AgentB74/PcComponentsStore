# Generated by Django 3.0.3 on 2020-06-06 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20200606_1240'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='telephone_numb',
            field=models.CharField(blank=True, default='-----', max_length=12, null=True),
        ),
    ]
