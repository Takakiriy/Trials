from  django.shortcuts      import  render
from  django.shortcuts      import  redirect
from  django.views.generic  import  TemplateView
from  .models  import  Friend
from  .forms   import  GetByIDForm
from  .forms   import  FriendForm


class  GetByIDView( TemplateView ):  #// GetByIDView クラスの定義、TemplateView から継承
	def  __init__( self ):
		self.params = {
			'title':    'Hello',
			'message':  'all friends.',
			'form':     GetByIDForm(),
			'data':     [],
		}


	def  get( self, request ):
		self.params[ 'data'  ] = Friend.objects.all()
		self.params[ 'values'] = Friend.objects.all().values()
		self.params[ 'count' ] = Friend.objects.all().count()
		self.params[ 'first' ] = Friend.objects.all().first()
		self.params[ 'last'  ] = Friend.objects.all().last()

		return  render( request,  'hello/index.html',  self.params )


	def  post( self, request ):
		a_ID = request.POST[ 'id' ]

		an_item = Friend.objects.get( id= a_ID )  #// IDで検索
		self.params[ 'data'  ] = [ an_item ]
		self.params[ 'form'  ] = GetByIDForm( request.POST )
		self.params[ 'values'] = ""
		self.params[ 'count' ] = 1
		self.params[ 'first' ] = Friend.objects.all().first()
		self.params[ 'last'  ] = Friend.objects.all().last()

		return  render( request,  'hello/index.html',  self.params )


def  create( request ):

	if ( request.method == 'POST' ):
		friend_form = FriendForm( request.POST,  instance= Friend() )

		friend_form.save()
		return  redirect(to='/hello')

	elif ( request.method == 'old_create_POST' ):
		friend = Friend(
			name= request.POST[ 'name' ],
			mail= request.POST[ 'mail' ],
			gender= 'gender' in request.POST,
			age=  int( request.POST[ 'age' ] ),
			birthday= request.POST[ 'birthday' ] )
		friend.save()
		return  redirect(to='/hello')

	params = {
		'title': 'Hello',
		'form': FriendForm(),
	}
	return  render (request, 'hello/create.html',  params )


def  update( request,  in_ID ):
	updating_friend = Friend.objects.get( id= in_ID )

	if ( request.method == 'POST' ):
		friend_form = FriendForm( request.POST,  instance= updating_friend )

		friend_form.save()
		return  redirect( to= '/hello' )

	return  render( request,  'hello/update.html',  {
		'title':  'Hello',
		'id':     in_ID,
		'form':   FriendForm( instance= updating_friend ),
	})


def  delete( request, in_ID ):
	deleting_friend = Friend.objects.get( id= in_ID )

	if (request.method == 'POST'):

		deleting_friend.delete()
		return  redirect( to= '/hello' )

	return  render( request,  'hello/delete.html',  {
		'title':  'Hello',
		'id':     in_ID,
		'obj':    deleting_friend,
	})

