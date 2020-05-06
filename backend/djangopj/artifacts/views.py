from django import forms
from django.shortcuts import render, get_object_or_404, redirect
from .models import Artifact
from .models import ArtifactImage
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import filters


class ArtifactPost(forms.ModelForm):
    class Meta:
        model = Artifact
        fields = ['title', 'description']


class ArtifactPostImage(forms.ModelForm):
    class Meta:
        model = ArtifactImage
        fields = ['image']


def artifact(request):
    artifacts = Artifact.objects
    return render(request, 'artifacts.html', {'artifacts': artifacts})


def detail(request, artifact_id):
    artifact_detail = get_object_or_404(Artifact, pk=artifact_id)
    return render(request, 'detail.html', {'artifact': artifact_detail})


def register(request):  # 작품 업로드
    # 입력된 내용을 처리하는 기능 -> POST
    if request.method == 'POST':
        artifact_form = ArtifactPost(request.POST, request.FILES)
        image_form = ArtifactImage(request.POST, request.FILES)
        if artifact_form.is_valid() and image_form.is_valid():
            # post = form.save(commit=False)
            # post.pub_date = timezone.now()
            artifact_form.save()
            image_form.save()
            return redirect('artifacts')
        else:
            return redirect('home')
    # 빈 페이지를 띄워주는 기능 -> GET
    else:
        form = ArtifactPost()
        return render(request, 'register.html', {'form': form})
