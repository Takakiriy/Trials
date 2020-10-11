from django.shortcuts import render
from django.http import HttpResponse

def index( request ):
	return  render( request,  'hello/index.html', {
		'title':  'Hello/Index',
		'msg':    'サンプルです。',
		'goto':   'index' } )
