from rest_framework.pagination import PageNumberPagination


class ArtifactsPagination(PageNumberPagination):
    page_size = 12
