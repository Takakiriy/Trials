# -*- coding: utf-8 -*-
"""
Created on Fri Feb  2 18:59:43 2018

@author: tuyano
"""

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:num>', views.index, name='index'),
    path('create', views.create, name='create'),
    path('edit/<int:num>', views.edit, name='edit'),
    path('delete/<int:num>', views.delete, name='delete'),
    path('find', views.find, name='find'),
    path('check', views.check, name='check'),
    path('message/', views.message, name='message'),
    path('message/<int:page>', views.message, name='message'),
]

