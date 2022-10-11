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
    questions_answered = []
    for question in request.user.player.questions_answered.all():
        questions_answered.append(question.id)
    return JsonResponse(questions_answered, safe=False)


@login_required
def quiz(request):
    print(request.POST)

    player, created = Player.objects.get_or_create(player=request.user)
    categories = Category.objects.all()
    form = QuizForm(request.POST or None)

    if form.is_valid():
        category = get_object_or_404(Category, pk=request.POST.get('category_pk'))
        question = get_object_or_404(Question, pk=request.POST.get('question_pk'))
        answer = get_object_or_404(Answer, pk=request.POST.get('answer_pk'))
        player.questions_answered.add(question)

        # Check to see if ALL questions in this category have now been answered
        # Using a set since I don't care about order, but there should be no duplicates
        questions_in_this_category_answered = set(player.questions_answered.filter(category=category))
        all_questions_in_this_category = set(Question.objects.filter(category=category))

        if questions_in_this_category_answered == all_questions_in_this_category:
            player.categories_done.add(category)

        if answer == question.correct_answer:
            player.score = player.score + 1
            player.save()
        return redirect('quiz:quiz')


    context = {
        'player': player,
        'categories': categories,
        'categories_done': player.categories_done,
    }

    return render(request, "quiz/quiz.html", context)
