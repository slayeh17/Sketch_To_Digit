import json
from django.http import JsonResponse
from django.shortcuts import render, HttpResponse
import joblib
import pickle
from django.conf import settings

# Create your views here.
def index(request):
    return render(request, "app/index.html")

def predict_digit(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            img_arr = data.get('array', [])
            print(img_arr)

            BASE_DIR = settings.BASE_DIR
            file_path = BASE_DIR / "app" / "model_trained.pkl"

            model = joblib.load(file_path)
            prediction = model.predict([img_arr])
            print(prediction)

            return JsonResponse({'success': True, 'prediction': str(prediction)})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON data'})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})