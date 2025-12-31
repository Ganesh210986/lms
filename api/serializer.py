from .models import Book, issued
from rest_framework import serializers

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
        
class IssuedSerializer(serializers.ModelSerializer):
    class Meta:
        model = issued
        fields = '__all__'