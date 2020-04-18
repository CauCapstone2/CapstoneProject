from rest_framework.pagination import PageNumberPagination


class ArtifactsPagenation(PageNumberPagination):
    page_size = 12
