document.addEventListener('DOMContentLoaded', () => {

    // Target the select tags in the DOM (the html template)
    let category = document.getElementById('category');
    let question = document.getElementById('question');
    let answer = document.getElementById('answer');
    let submit = document.getElementById('submit');

    // Hide the questions and answers until the user selects a category
    question.style.display = 'none';
    answer.style.display = 'none';

    // Disable (you could also hide) the button until the form is completed
    submit.disabled = true;


    ////////////////////////////////////////////////////////////////////////
    ///////////////////////// GET QUESTIONS ////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    async function get_questions(e) {

        answer.style.display = 'none';
        answer.value = 0;
        question.value = 0;
        submit.disabled = true;

        fetch(`/get_questions/${e.target.value}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Success: ${data}`);
            for (i = 0; i < data.length; i++) {
                question.options[i+1] = new Option(data[i].question, data[i].id);
            }
            question.style.display = 'block';
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
    }

    category.addEventListener('input', get_questions);


    ////////////////////////////////////////////////////////////////////////
    ///////////////////////// GET ANSWERS //////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    async function get_answers(e) {

        answer.value = 0;
        submit.disabled = true;

        fetch(`/get_answers/${e.target.value}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Success: ${data}`);
            for (i = 0; i < data.length; i++) {
                answer.options[i+1] = new Option(data[i].answer, data[i].id);
            }
            answer.style.display = 'block';
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
    }

    question.addEventListener('input', get_answers);


    ////////////////////////////////////////////////////////////////////////
    /////////////////////// Enable/Disable SUBMIT //////////////////////////
    ////////////////////////////////////////////////////////////////////////

    answer.addEventListener('input', () => {
        submit.disabled = false;
    });

});
