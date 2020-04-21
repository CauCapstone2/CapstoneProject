from django import forms
from django.shortcuts import render, get_object_or_404, redirect
from .models import Artifact
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import filters

def artifact(request):
    artifacts = Artifact.objects
    return render(request, 'artifacts.html', {'artifacts': artifacts})

def detail(request, artifact_id):
    artifact_detail = get_object_or_404(Artifact, pk = artifact_id)
    return render(request, 'detail.html', {'artifact' : artifact_detail})

class ArtifactPost(forms.ModelForm):
    class Meta:
        model = Artifact
        fields = ['title', 'image', 'description']

def register(request): # 작품 업로드
    # 입력된 내용을 처리하는 기능 -> POST
    if request.method == 'POST':
        form = ArtifactPost(request.POST, request.FILES)
        if form.is_valid():
            # post = form.save(commit=False)
            # post.pub_date = timezone.now()
            form.save()
            return redirect('artifacts')
        else :
            return redirect('home')
    # 빈 페이지를 띄워주는 기능 -> GET
    else:
        form = ArtifactPost()
        return render(request, 'register.html', {'form':form})
