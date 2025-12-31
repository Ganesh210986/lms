
from django.urls import path
from .views import BookListCreateAPIView,IssueListCreateAPIView

urlpatterns = [

    path('books/', BookListCreateAPIView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookListCreateAPIView.as_view(), name='book-detail'),
    path('issued/', IssueListCreateAPIView.as_view(), name='issued-list'),
]
