from django.shortcuts import render,redirect
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
        form = LoginForm(request.POST)
        if form.is_valid():
            # <process form cleaned data>
            usuario= authenticate(username=form.cleaned_data['username'],password=form.cleaned_data['password'])
            if usuario is not None:
		        if usuario.is_active:
			        login(request,usuario)
			        print "1"
			        return redirect('home/')
		        else:
			        print "2"
			        return HttpResponse("You're account is disabled.")
            
            
        return render(request, self.template_name, {'login_form': self.login_form})
        
def Logout(request):
	logout(request)
	request.session.flush()
	return redirect('/')
	
	
class HomeView(TemplateView):
    
    template_name = 'home.html'
    
    def get(self, request):
        
        return render(request, self.template_name)