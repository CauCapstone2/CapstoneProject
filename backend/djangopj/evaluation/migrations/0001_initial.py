# Generated by Django 3.0.6 on 2020-06-09 12:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('artifacts', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Evaluation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Creative', models.IntegerField()),
                ('Expressive', models.IntegerField()),
                ('Quality', models.IntegerField()),
                ('Popularity', models.IntegerField()),
                ('Workability', models.IntegerField()),
                ('artifactID', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='artifacts.Artifact')),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('userID', 'artifactID')},
            },
        ),
    ]
