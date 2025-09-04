import json
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.exceptions import AuthenticationFailed, ValidationError
import jwt, datetime
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import status


class LoginView(APIView):
    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        # Authenticate user
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("Invalid email")
        
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")

        # Use the SimpleJWT serializer to generate tokens
        serializer = TokenObtainPairSerializer(data={
            'email': email,
            'password': password
        })
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data

        # Set HttpOnly cookie with tokens
        response = Response()
        response.data = {
            'message': 'Successful login',
            'data': tokens
        }

        response.set_cookie(
        key='refresh_token',
        value=tokens['refresh'],
        httponly=True,
        samesite='Lax',
        secure=False,
        path='/'
        )

        response.set_cookie(
        key='access_token',
        value=tokens['access'],
        httponly=False,  
        samesite='Lax',
        secure=False,
        path='/'
        )

        return response


class RegisterView(APIView):
    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request):  
        email = request.data['email']
        user = User.objects.filter(email=email).first()

        if user:
            raise ValidationError('Email is already used!')

        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
    
    
class UserView(APIView):
    def get(self, request):
          
        try:
            access_token = request.COOKIES.get("access_token")

            payload = AccessToken(access_token)
            user_id = payload['user_id']
        except Exception as e:
            raise AuthenticationFailed("Unauthenticated")

        user = User.objects.filter(id=user_id).first()   
        serializer = UserSerializer(user)

        return Response(serializer.data)
    

class LogoutView(APIView):
    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request):
        response = Response()
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')  # Delete the cookie
        response.data = {
            'message': 'Successfully logged out'
        }
        return response
    
    
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({"detail": "Refresh token not provided"})

        # Fake request.data so the serializer can use it
        request.data._mutable = True  # Needed if QueryDict is immutable
        request.data['refresh'] = refresh_token

        # Call parent method
        response = super().post(request, *args, **kwargs)

        # Get new access token from the response
        access = response.data.get("access")
        refresh = response.data.get("refresh")

        if access and refresh:
            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                samesite="Lax",
                secure=False,
                path="/"
            )
            response.set_cookie(
                key="access_token",
                value=access,
                httponly=False,
                samesite="Lax",
                secure=False,
                path="/"
            )

        return response