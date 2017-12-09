    var correctAnswerPosition = 0;
    var correctAnswer;
    var time = 30;
    var isNewQuestion = false;
    var correctlyAnswered = 0;
    var unAnswered = 0;
    var wronglyAnswered = 0;
    var questionCount = 0;
    var intervalId=0;

    queryURL = "https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple"

    

    function loadNewQuestion() {

        $('#timerem').text("Time Remaining ");

        correctAnswerPosition = 0;
        correctAnswer;
        time = 30;

        if (isNewQuestion) {
            // clearInterval(internew);
            // internew = false;
            clearInterval(intervalId);
            clearbox();   
            console.log("New question " + questionCount)
        }

        if (questionCount < 5) //total number of questions
        {
            clearbox(); 

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(res) {
                response = res;
                console.log(response);
                document.getElementById('question').innerHTML = "<h3>" + response.results[0].question + "</h3>";

                /*get random position to place the correct answer*/

                correctAnswerPosition = Math.floor((Math.random() * 4))
                console.log("Correct answer: " + response.results[0].correct_answer + " in Position : " + correctAnswerPosition);
                correctAnswer = response.results[0].correct_answer;
                //create an array 
                var answers = [response.results[0].incorrect_answers[0], response.results[0].incorrect_answers[1], response.results[0].incorrect_answers[2]]
                //add the correct answer into the random position
                answers.splice(correctAnswerPosition, 0, response.results[0].correct_answer);

                document.getElementById('answerSection').innerHTML = document.getElementById('answerSection').innerHTML + "<div class='ansbuttons id='button1'> <p>" + answers[0] + " </p> </div> ";
                document.getElementById('answerSection').innerHTML = document.getElementById('answerSection').innerHTML + "<div class='ansbuttons'> <p>" + answers[1] + "</p>";
                document.getElementById('answerSection').innerHTML = document.getElementById('answerSection').innerHTML + "<div class='ansbuttons'> <p>" + answers[2] + "</p>";
                document.getElementById('answerSection').innerHTML = document.getElementById('answerSection').innerHTML + "<div class='ansbuttons'> <p>" + answers[3] + "</p>";

                questionCount++;
                
                clearInterval(intervalId);
                intervalId = setInterval(incrTime, 1000);
                console.log('first'+intervalId);
            });

        } 
        else 
        {
            //Summary Page
            clearInterval(intervalId);
            clearbox();
            $('#question').html("<h2> Summary </h2>");
            $('#answerSection').html("<p> Correct Answers: " + correctlyAnswered + "</p>");
            $('#answerSection').append("<p> Wrongly Answers: " + wronglyAnswered + "</p>");
            $('#answerSection').append("<p> Unanswered: " + unAnswered + "</p>");
            $('#answerSection').append("<br><br> <a id ='resetButton' style='color:red'> Reset </a>");

            $(document).on('click', '#resetButton', function() {

                console.log('second'+intervalId);
                clearInterval(intervalId);
                ClearAllIntervals();
                questionCount = 0;
                correctAnswerPosition = 0;
                correctAnswer;
                time = 30;
                isNewQuestion = true;
                correctlyAnswered = 0;
                unAnswered = 0;
                wronglyAnswered = 0;
                clearbox();
                loadNewQuestion();
            })
        }
    }

    function incrTime() {
        

        time--;
        $('#timerem').text("Time Remaining "+time);
        if (time <= 0) {
            clearInterval(intervalId);
            clearbox();
            $('#question').html("<h2> Out of Time !!! </h2>");
            $('#answerSection').html("<h2> The correct answer was :" + correctAnswer + "</h2>");
            isNewQuestion = true;
            unAnswered++;
            setTimeout(loadNewQuestion, 3000);
        }
    }

    $(document).on("click", ".ansbuttons", function(event) {

        if (this.innerText == "Start")
            {
                clearbox();
                loadNewQuestion();
            }
        else {

            if (this.innerText == correctAnswer) {

                clearInterval(intervalId);
                clearbox();
                $('#question').html("<h2> You are correct !!! </h2>");
                $('#answerSection').html("<h2> The correct answer is :" + correctAnswer + "</h2>");
                //insert gif

                correctlyAnswered++
                isNewQuestion = true;
                setTimeout(loadNewQuestion, 3000); 

            } else {
                clearInterval(intervalId);
                clearbox();
                $('#question').html("<h2> You are wrong !!! </h2>");
                $('#answerSection').html("<h2> The correct answer was :" + correctAnswer + "</h2>");
                wronglyAnswered++;
                isNewQuestion = true;
                setTimeout(loadNewQuestion, 3000);
            }

        }

    });

    function clearbox() {
        $('#question').empty();
        $('#answerSection').empty();
    }

    function ClearAllIntervals() {
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
}
