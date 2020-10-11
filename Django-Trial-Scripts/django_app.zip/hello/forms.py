from django import forms
from.models import Friend, Message

class HelloForm(forms.Form):
    name = forms.CharField(label='Name', empty_value=True)
    mail = forms.EmailField(label='Email', required=False)
    gender = forms.BooleanField(label='Gender',required=False)
    age = forms.IntegerField(label='Age')
    birthday = forms.DateField(label='Birth', required=False)

class FriendForm(forms.ModelForm):
    class Meta:
        model = Friend
        fields = ['name','mail','gender','age','birthday']
        
class FindForm(forms.Form):
    find = forms.CharField(label='Find', required=False)


class CheckForm(forms.Form):
    str = forms.CharField(label='String')
    
    def clean(self):
        cleaned_data = super().clean()
        str = cleaned_data['str']
        if (str.lower().startswith('no')):
            raise forms.ValidationError('You input "NO"!')

# from.models import Friend, Message
            
class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['title','content','friend']
        

# 日本語