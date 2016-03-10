from django.http import HttpResponse
from django.shortcuts import render,redirect
from django.template import RequestContext

from .forms import LoginForm
from django.views.generic import TemplateView
from django.contrib.auth import login,authenticate,logout

# Create your views here.
class LoginView(TemplateView):
    
    template_name = 'index.html'
    login_form  = LoginForm()
    
    def get(self, request):
        
        return render(request, self.template_name,{'login_form':self.login_form})
    
    def post(self, request):
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            # <process form cleaned data>
            usuario= authenticate(username=login_form.cleaned_data['username'],password=login_form.cleaned_data['password'])
            if usuario is not None:
                if usuario.is_active:
                    login(request,usuario)
                    return redirect('home/')
                else:
                    return render(request, self.template_name, {'login_form': login_form,
                                                                'error_disabled': "You're account is disabled."})
        return render(request, self.template_name, {'login_form': login_form})
        
def Logout(request):
    logout(request)
    request.session.flush()
    return redirect('/')
	
	
class HomeView(TemplateView):

    template_name = 'home.html'
    
    def get(self, request):
        
        return render(request, self.template_name)