from django import forms

class  HelloForm( forms.Form ):  #// HelloForm クラスの定義、forms.Form から継承
	name = forms.CharField( label= 'name' )
	mail = forms.CharField( label= 'mail' )
	age = forms.IntegerField( label= 'age' )

