# Generated by Django 3.0.6 on 2020-06-07 17:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artifacts', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='artifact',
            old_name='recreateFlag',
            new_name='recreatation',
        ),
    ]
