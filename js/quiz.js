// ==========================================
// QUIZ PAGE
// ==========================================

var displayQuestion = 0;
var categories = {"solar": 0,
                  "transport": 0,
                  "water": 0,
                  "lighting": 0,
                  "hvac": 0,
                  "reduceWaste": 0,
                  "lowCarbonDiet": 0,
                  "recycle": 0};
var totalPoints = 0;

var myListofQuestions = [
     {
         question: "Do you recycle?",
         choices: ["Yes", "No"],
         addPoints: [10, 0],
         category: "recycle"
    },
    {
         question: "How do you get to work most often?",
         choices: ["Car", "Public Transit", "Walk or Bike"],
         addPoints: [0, 5, 10],
         category: "transport"
    },
    {
        question: "In the summer, at what temperature do you keep your thermostat?",
        choices: ["Ice Locker", "Fairly Cool"],
        addPoints: [0, 10],
        category: "hvac"
    },
    {
        question: "In the winter, at what temperature do you keep your thermostat?",
        choices: ["Sauna", "Pleasantly Warm"],
        addPoints: [0, 10],
        category: "hvac"
    },
    {
         question: "Do you buy local produce?",
         choices: ["Yes", "No"],
         addPoints: [10, 0],
         category: "lowCarbonDiet"
    },
    {
        question: "How much meat do you usually eat weekly?",
        choices: ["Carnivore", "Omnivore", "Vegetarian"],
        addPoints: [0, 5, 10],
        category: "lowCarbonDiet"
    },
    {
        question: "How long do you usually spend in the shower?",
        choices: ["5-10 minutes", "10-25 minutes", "Eternity"],
        addPoints: [10, 5, 0],
        category: "water"
    },
    {
        question: "What kind of lightbulbs do you buy?",
        choices: ["Incandescent", "Halogen or LED"],
        addPoints: [0, 10],
        category: "lighting"
    },
    {
      question: "Do you have a low flow toilet or faucets?",
      choices: ["Yes", "No"],
      addPoints: [10, 0],
      category: "water"
    },
    {
        question: "Do you have solar panels at your home?",
        choices: ["Yes", "No"],
        addPoints: [10, 0],
        category: "solar"
    }
];

var firebase;
var database;

function init() {
    // 1. Initialize Firebase

    var config = {
        apiKey: "AIzaSyCGkDV0SZ5P4jZkRhezkvd-Vm0CqEk22ug",
        authDomain: "drawdown-88164.firebaseapp.com",
        databaseURL: "https://drawdown-88164.firebaseio.com",
        projectId: "drawdown-88164",
        storageBucket: "drawdown-88164.appspot.com",
        messagingSenderId: "847299270208"
    };

    firebase.initializeApp(config);

    database = firebase.database();
}

init();



startQuiz();

function startQuiz() {

  $("#gameWrapper").toggleClass("hidden");

  showQuestion();

}

function showQuestion() {
  myQuestion = "";
  myQuestion = myQuestion + "<p class='bold center_q'>" + myListofQuestions[displayQuestion].question + "</p>";
  myListofQuestions[displayQuestion].choices.forEach(function(choice) {
    myQuestion +="<input type='radio' id='" + choice + "' name='" + displayQuestion + "' value='" + choice + "' + class='selectable'><label for='" + choice + "' class='round-button'>" + choice + "</label>";
  });

  $("#quiz_question").html(myQuestion);

  $(".selectable").on("click", function() {
    var index = $("input").index(this);
    processQuestion(index);
  });
}

var results = [];
var counter = 0;
var cleanResults = {};

function processQuestion(idx) {

    //console.log("index",counter);
  var pointsToAdd = myListofQuestions[displayQuestion].addPoints[idx]
  var thisCategory = myListofQuestions[displayQuestion].category;
  var currCategoryTotal = categories[thisCategory];
  totalPoints += pointsToAdd;
  categories[thisCategory] = currCategoryTotal + pointsToAdd;


  if (displayQuestion < myListofQuestions.length - 1) {


      results.push({
          answers: myListofQuestions[displayQuestion].choices[idx],
          question: myListofQuestions[displayQuestion].question
      });

      cleanResults[myListofQuestions[displayQuestion].question] = myListofQuestions[displayQuestion].choices[idx];

      counter++;
      displayQuestion++;
      showQuestion();
  }

  else {

      //push result to firebase
      var userUid = window.localStorage.getItem("drawdownToken");

      firebase.database().ref('users/' + userUid).update({
          //quizResults: results,
          cleanResults: cleanResults,
          categoryScores: categories,
          totalScore: totalPoints
      });

      //set total score to local storage
      window.localStorage.setItem("newScore", totalPoints);

    $("#gameWrapper").toggleClass("hidden");
    $("#results_button").toggleClass("hidden");
    console.log("done");
  }
}

//On click of submit button, grab user data and push to firebase.
$("#results_button").on("click", function(event) {

    event.preventDefault();

    window.location = "profile.html";

});
