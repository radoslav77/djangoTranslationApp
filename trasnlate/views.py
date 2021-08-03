from django.http import response, JsonResponse
from django.shortcuts import redirect, render
from translate import Translator
# Create your views here.


def index(request):
    if request.method == "POST":
        text = request.POST["text"]
        language = request.POST["leng"]
        if not language:
            msg = "You need to choose a Language to translate to!!! Please hit the back button!!"
            return render(request, 'translate/index.html', {
                'msg': msg
            })
        translator = Translator(to_lang=language)
        translation = translator.translate(text)
        return render(request, 'translate/index.html', {
            'text': translation
        })
        '''
        # returns json responce
       
        data = {
            'originalText': text,
            'language': language,
            'translatedText': translation,
        }
        print(translation)
        return JsonResponse(data, safe=False)
        '''
    return render(request, "translate/index.html")
