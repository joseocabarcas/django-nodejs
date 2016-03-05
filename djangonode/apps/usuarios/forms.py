from django import forms
from django.contrib.auth import login,authenticate

class LoginForm(forms.Form):
    username = forms.CharField(max_length=30,
        widget=forms.TextInput(attrs=
            {
            'class':'form-control',
            }))
    password = forms.CharField(max_length=30, 
    	widget=forms.TextInput(attrs={
    		'type': 'password',
            'class':'form-control',
    		}))

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        if not user or not user.is_active:
            raise forms.ValidationError("Sorry, that login was invalid. Please try again.")
        return self.cleaned_data