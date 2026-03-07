from django.http import HttpResponse


def index(request):
    return HttpResponse("Study space app is working")