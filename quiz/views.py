from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from .models import Player, Category, Question, Answer
from .forms import QuizForm

import json


@login_required
def quiz(request):
    return render(request, "quiz/quiz.html")
