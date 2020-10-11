from  django   import  forms
from  .models  import  Friend

class  GetByIDForm( forms.Form ):  #// GetByIDForm クラスの定義、forms.Form から継承
	id = forms.IntegerField( label= 'ID' )


class  FriendForm( forms.ModelForm ):
	class  Meta:
		model = Friend
		fields = [ 'name', 'mail', 'gender', 'age', 'birthday' ]

class  OldFriendForm( forms.Form ):
    name     = forms.CharField(    label= 'Name',   empty_value= True )
    mail     = forms.EmailField(   label= 'Email',  required= False )
    gender   = forms.BooleanField( label= 'Gender', required= False )
    age      = forms.IntegerField( label= 'Age')
    birthday = forms.DateField(    label= 'Birth',  required= False )

