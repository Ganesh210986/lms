from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import BookSerializer, IssuedSerializer
from .models import Book, issued
from rest_framework import status

# Create your views here.

class BookListCreateAPIView(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class IssueListCreateAPIView(APIView):
    def get(self, request):
        issued_books = issued.objects.all()
        serializer = IssuedSerializer(issued_books, many=True)
        return Response(serializer.data)
        
    def post(self, request):
        serializer = IssuedSerializer(data=request.data)
        if serializer.is_valid():
            book_id=request.data.get('book')
            try:
                book=Book.objects.get(id=book_id)
                if book.quantity<=0:
                    return Response({"error":"Book not available"},status=status.HTTP_400_BAD_REQUEST)
                book.quantity-=1
                book.save()
                
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            except Book.DoesNotExist:
                return Response({"error":"Book does not exist"},status=status.HTTP_400_BAD_REQUEST)
            
        serializer.save()
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, pk):
        try:
            issued_book = issued.objects.get(pk=pk)
        except issued.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        serializer = IssuedSerializer(issued_book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request, pk):
        try:
            issued_book = issued.objects.get(pk=pk)
        except issued.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        serializer = IssuedSerializer(issued_book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            issued_book = issued.objects.get(pk=pk)
        except issued.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        issued_book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    