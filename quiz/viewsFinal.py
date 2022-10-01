from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from .models import Player, Category, Question, Answer
from .forms import QuizForm

import json


@login_required
def get_questions(request, category_pk):
    questions = Question.objects.filter(category=category_pk)
    return JsonResponse(list(questions.values()), safe=False)


@login_required
def get_answers(request, question_pk):
    answers = Answer.objects.filter(question=question_pk)
    return JsonResponse(list(answers.values()), safe=False)


@login_required
def get_questions_answered(request):
    questions_answered = request.user.player.questions_answered
    return JsonResponse(list(questions_answered.values()), safe=False)


@login_required
def quiz(request):

    player, created = Player.objects.get_or_create(player=request.user)

    categories = Category.objects.all()

    form = QuizForm(request.POST or None)

    if form.is_valid():
        question = get_object_or_404(Question, pk=request.POST.get('question_pk'))
        answer = get_object_or_404(Answer, pk=request.POST.get('answer_pk'))
        player.questions_answered.add(question)
        if answer == question.correct_answer:
            player.score = player.score + 1
            player.save()
        return redirect('quiz:quiz')


    context = {
        'player': player,
        'categories': categories,
    }

    return render(request, "quiz/quiz.html", context)
