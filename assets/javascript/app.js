var trivia = [{
        'question': "Beer is made from water, yeast, grains (malted barley), and ______.",
        'answers': ["sugar", "hops", "alcohol", "gluten"],
        'correct': "hops"
    },
    {
        'question': "In 1516, the Reinheitsgebot, also known as the beer purity law, was adopted. This law specified that all beer was only to conain three ingredients, water, barley, and hops.(Yeast was unknown at this time. In what modern day country did this law originate?",
        'answers': ["Germany", "Sweden", "Ireland", "England"],
        'correct': "Germany"
    },
    {
        'question': "Which of these beer styles is a pale lager characterized as light straw to golden colour with more bitter or earthy taste?",
        'answers': ["IPA", "Porter", "Hefeweizen", "Pilsner"],
        'correct': "Pilsner"
    },
    {
        'question': "What style of beer is a Natural Light?",
        'answers': ["Session IPA", "Pilsner", "Vienna Lager", "Berliner Weisse"],
        'correct': "Pilsner"
    },
    {
        'question': "How many 12 oz beers does a standard half barrel keg hold?",
        'answers': ["84", "128", "165", "188"],
        'correct': "165"

    },
    {
        'question': "What is the oldest brewery in the world?",
        'answers': ["Weihenstaphan Brewery", "Pilsner Urquell Brewery", "Warsteiner Brewery", "Krombacher Brewery"],
        'correct': "Weihenstaphan Brewery"
    },
    {
        'question': "What is the oldest brewery in North America?",
        'answers': ["Samuel Adams Brewery", "D.G. Yuengling Brewery", "Anheuser-Busch", "Molson, Inc."],
        'correct': "Molson, Inc."
    },
    {
        'question': "Which German city hosts Oktoberfest?",
        'answers': ["Hamburg", "Berlin", "Munich", "Frankfurt"],
        'correct': "Munich"
    },
];

var number = 45;
var intervalId;
var correct = 0;
var wrong = 0;

function runTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    number--;

    $("#show-number").html("<h2>Time Remaining: " + number + "</h2>");
    if (number === 0) {
        stop();
        alert("Time Up!");
        reset();
    }
}

function stop() {
    clearInterval(intervalId);
}

function createQuestions() {
    for (var i = 0; i < trivia.length; i++) {
        var questionDiv = $("<div>");
        var answerDiv = $("<form action='#'></form>");

        questionDiv.append(trivia[i].question);

        for (var j = 0; j < trivia[i].answers.length; j++) {
            var p = $("<p>");
            var label = $("<label>");
            var input = $("<input name='group" + i + "' id='" + trivia[i].answers[j] + "'  class='with-gap' type='radio' />");
            var span = $("<span>" + trivia[i].answers[j] + "</span>");

            answerDiv.append(p);
            p.append(label);
            label.append(input)
            label.append(span);
        }

        $(".game").append(questionDiv);
        $(".game").append(answerDiv);
    }
    $(".game").append("<button class='btn waves-effect waves-light' id='submit' type='submit' name='action'><i class='material-icons'>SUBMIT</i></button>");



}



function start() {
    console.log('button clicked');
    $(".start").hide();
    $(".game").show();
    $("#show-number").show();
    $("#results").show();
    createQuestions();
    runTimer();
}

function getValues() {
    console.log("get value ran");
    // $(document).ready(function () {

    for (var i = 0; i < trivia.length; i++) {
        console.log("i: " + i);
        // var onevalue = $("input[name='group1']:checked").html();

        var radioValue = $("input[name='group" + i + "']:checked")[0];
        console.log( typeof radioValue);

        if ((typeof radioValue) != 'undefined') {
            radioValue = radioValue.id;
            if (radioValue == trivia[i].correct) {
                correct++;

            } else {
                wrong++;
            }
        }else {
            wrong++;
        }
        console.log(radioValue);


    }
    // });

}

function checkAnswers() {
    getValues();

    $(".game").empty();

    for (var i = 0; i < trivia.length; i++) {
        var questionDiv = $("<div>");
        var answerDiv = $("<form action='#'></form>");

        questionDiv.append(trivia[i].question);

        for (var j = 0; j < trivia[i].answers.length; j++) {
            var p = $("<p>");
            var label = $("<label>");
            var input = $("<input name='group" + i + "' type='radio' />");
            var span = $("<span>" + trivia[i].answers[j] + "</span>");
            if (trivia[i].answers[j] == trivia[i].correct) {
                span.css("border", "3px solid #008000");
                span.css("font-weight", "bold");
            }

            answerDiv.append(p);
            p.append(label);
            label.append(input)
            label.append(span);
        }



        $(".game").append(questionDiv);
        $(".game").append(answerDiv);
    }
    $(".header").append("<h2 id='results'> You got " + correct + " questions right and " + wrong + " questions wrong!");


}

function reset() {
    number = 45;
    correct = 0;
    wrong = 0;
    $(".start").show();
    $(".game").empty().show();
    $("#show-number").empty().hide();
    $("#results").empty().hide();


}

$("#start-quiz").on("click", start);



$(".game").on('click', '#submit', function () {
    event.preventDefault();
    checkAnswers();
    stop();

    setTimeout(reset, 10000);

});