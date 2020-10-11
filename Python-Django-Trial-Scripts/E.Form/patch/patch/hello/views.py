from django.shortcuts import render
from django.http import HttpResponse

def index( request ):
	return  render( request,  'hello/index.html', {
		'title':  'Hello/Index',
		'msg':    'まだ、入力されていません。' } )

def form( request ):
	return  render( request,  'hello/index.html', {
		'title':  'Hello/Form',
		'msg':    '入力したテキストは、' + request.POST[ 'msg' ] +"ですね。" } )
