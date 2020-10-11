from  django.urls  import  path
from  .            import  views
from  .views       import  GetByIDView

urlpatterns = [
	path( '',                     GetByIDView.as_view(),  name= 'index' ),
	path( 'create/',              views.create,           name= 'create' ),
	path( 'update/<int:in_ID>/',  views.update,           name= 'update' ),  #// e.g. 'update/1/'
	path( 'delete/<int:in_ID>/',  views.delete,           name= 'delete' ),
]
