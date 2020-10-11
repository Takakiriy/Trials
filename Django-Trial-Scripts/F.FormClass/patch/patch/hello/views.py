from  django.shortcuts      import  render
from  django.http           import  HttpResponse
from  django.views.generic  import  TemplateView
from  .forms                import  HelloForm

class  HelloView( TemplateView ):  #// HelloForm クラスの定義、TemplateView から継承
	def  __init__( self ):
		self.params = {
			'title':   'Hello',
			'message': 'まだ入力されていません',
			'form':    HelloForm(),
		}

	def  get( self, request ):
		return  render( request, 'hello/index.html',  self.params )

	def  post( self, request ):
		self.params[ 'message' ] = \
			request.POST[ 'name' ] +"さん("+ request.POST[ 'age' ] +") "+ request.POST[ 'mail' ]
		self.params[ 'form' ] = \
			HelloForm( request.POST )
		return  render( request, 'hello/index.html',  self.params )

