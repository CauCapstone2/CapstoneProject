# Generated by Django 3.0.6 on 2020-06-01 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artifacts', '0005_auto_20200525_1347'),
    ]

    operations = [
        migrations.AddField(
            model_name='artifact',
            name='time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
