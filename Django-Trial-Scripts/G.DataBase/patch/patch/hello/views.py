from django.shortcuts import render
from django.http import HttpResponse
from .models import Friend

def index( request ):
	return  render( request,  'hello/index.html', {
		'title':    'Hello',
		'message':  'all friends.',
		'data':     Friend.objects.all() } )
