
from django.urls import path
from .views import BookListCreateAPIView,IssueListCreateAPIView,BookReturnAPIView

urlpatterns = [

    path('books/', BookListCreateAPIView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookListCreateAPIView.as_view(), name='book-detail'),
    path('return/<int:pk>/', BookReturnAPIView.as_view(), name='book-return'),
]
