from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static 

import home.views

urlpatterns = [    
    path('admin/', admin.site.urls),
    path('', home.views.home, name="home"),
    # path('artifacts/', include('artifacts.urls')),
    path('artifacts/api/', include('artifacts.api.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('comments/api/', include('comment.api.urls')),
    path('mypage/', include('mypage.urls')),
    path('evaluation/api/', include('evaluation.api.urls')),
    path('report/api/', include('report.api.urls')),
    path('search/', include('search.urls')),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
