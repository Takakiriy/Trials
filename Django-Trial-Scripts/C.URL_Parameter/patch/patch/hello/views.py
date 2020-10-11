from django.shortcuts import render
from django.http import HttpResponse

def index(request):
	if 'msg' in request.GET:
		msg = request.GET['msg']
		result = 'you typed: "'+ msg +'".'
	else:
		result = 'please send msg parameter!'
	return HttpResponse(result)

def index2(request, id, nickname):
	result = 'your id: '+ str(id) +', name: "' \
		+ nickname +'".'
	return HttpResponse(result)

