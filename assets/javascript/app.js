$(document).ready(function () {
    var options = [
        {
            question: "Which of these Yankee baseball greats set a Major League record for having 40 RBIs in World Series play?", 
            choice: ["Lou Gehrig", "Yogi Berra", "Joe DiMaggio", "Mickey Mantle"],
            answer: 3,
            photo: "assets/images/mickey.jpeg"
         },
         {
             question: "Which of these sluggers led their league in strikeouts the most times?", 
            choice: ["Jimmie Foxx", "Vince DiMaggio", "Reggie Jackson", "Mickey Mantle"],
            answer: 0,
            photo: "assets/images/jimmie.png"
         }, 
         {
             question: "The Baseball Hall of Fame inducted 5 players in 1936, its inaugural year. Name this all star that was NOT included in the original class.", 
            choice: ["Babe Ruth", "Christy Mathewson", "Lou Gehrig", "Ty Cobb"],
            answer: 2,
            photo: "assets/images/lou.png"
        }, 
        {
            question: "Which of these teams was two outs away in game seven from winning their first World Series in 49 years, but still ended up losing that World Series ?", 
            choice: ["New York / San Francisco Giants", "Boston Red Sox", "Chicago White Sox", "Cleveland Indians"],
            answer: 3,
            photo: "assets/images/cleveland.png"
        }, 
        {
            question: "After only nine seasons in Major League Baseball, St. Louis Cardinal Albert Pujols bagged his third National League MVP Award in 2009. Which statement is not true about Pujols?", 
            choice: ["He was a Rookie of the Year Award winner", "He won the 2009 MVP by only 14 ballot votes", "2009 was his first home run crown", "He won a batting title in 2003"],
            answer: 1,
            photo: "assets/images/albert.jpg"
        }, 
        {
            question: "Which of the following did not have 3000 hits in their career?", 
            choice: ["Rogers Hornsby", "Rafael Palmeiro", "Willie Mays", "Paul Waner"],
            answer: 0,
            photo: "assets/images/roger.png"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })