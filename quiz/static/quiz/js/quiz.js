document.addEventListener('DOMContentLoaded', () => {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////// INITIALIZE STUFF //////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const category = document.getElementById('category');
    const question = document.getElementById('question');
    const answer = document.getElementById('answer');
    const submit = document.getElementById('submit');

    question.style.display = 'none';
    answer.style.display = 'none';
    submit.disabled = true;


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////// GET QUESTIONS /////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async function get_questions(e) {

        answer.style.display = 'none';
        answer.value = 0;
        question.value = 0;
        submit.disabled = true;

        /*
        const [get_questions_answered, get_questions] = await Promise.all([
            fetch('/get_questions_answered'),
            fetch('/get_questions/' + e.target.value)
        ]);

        const [questions_answered, questions] = await Promise.all([
            get_questions_answered.json(),
            get_questions.json()
        ]);
        */

        const get_questions_answered = await fetch('/get_questions_answered');
        const questions_answered = await get_questions_answered.json();

        const get_questions = await fetch('/get_questions/' + e.target.value);
        const questions = await get_questions.json();

        //let questions_answered = await get_questions_answered.json();
        //let questions = await get_questions.json();

        for (let i = 0; i < questions.length; i++) {
            question.options[i+1] = new Option(questions[i].question, questions[i].id);
            if (questions_answered.includes(questions[i].id))
            question.options[i+1].disabled = true;
        }

        question.style.display = 'block';

    }

    category.addEventListener('input', get_questions);



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////// GET ANSWERS ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async function get_answers(e) {

        answer.value = 0;
        submit.disabled = true;

        const response = await fetch('/get_answers/' + e.target.value);
        const answers = await response.json();

        for (let i = 0; i < answers.length; i++)
            answer.options[i+1] = new Option(answers[i].answer, answers[i].id);

        answer.style.display = 'block';

    }

    question.addEventListener('input', get_answers);



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////// Enable/Disable SUBMIT ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    answer.addEventListener('input', () => {
        submit.disabled = false;
    });




});
