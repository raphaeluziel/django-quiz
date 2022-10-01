from django.urls import path

from . import views

app_name = 'quiz'

urlpatterns = [
    path('', views.quiz, name='quiz'),
    path('get_questions/<int:category_pk>', views.get_questions, name='get_questions'),
    path('get_answers/<int:question_pk>', views.get_answers, name='get_answers'),
    path('get_questions_answered', views.get_questions_answered, name='get_questions_answered'),
]
