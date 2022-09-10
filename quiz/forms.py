from django import forms

class QuizForm(forms.Form):
    player_pk = forms.IntegerField(min_value=0)
    category_pk = forms.IntegerField(min_value=0)
    question_pk = forms.IntegerField(min_value=0)
    answer_pk = forms.IntegerField(min_value=0)
