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

startQuiz();

function startQuiz() {

  $("#gameWrapper").toggleClass("hidden");

  showQuestion();

}

function showQuestion() {
  $("#question_num").html(displayQuestion + 1);
  myQuestion = "";
  myQuestion = myQuestion + "<p class='bold'>" + myListofQuestions[displayQuestion].question + "</p>";
  myListofQuestions[displayQuestion].choices.forEach(function(choice) {
    myQuestion = myQuestion + "<input type='radio' name=" + displayQuestion + " value=" + choice + " + class=\"selectable\">" + choice + "<br>";
  });

  $("#quiz_question").html(myQuestion);

  $(".selectable").on("click", function() {
    var index = $("input").index(this);
    processQuestion(index);
  });
}

function processQuestion(idx) {
  var pointsToAdd = myListofQuestions[displayQuestion].addPoints[idx]
  var thisCategory = myListofQuestions[displayQuestion].category;
  var currCategoryTotal = categories[thisCategory];
  totalPoints += pointsToAdd;
  categories[thisCategory] = currCategoryTotal + pointsToAdd;

  if (displayQuestion < myListofQuestions.length - 1) {
    displayQuestion++;
    showQuestion();
  }
  else {
    $("#gameWrapper").toggleClass("hidden");
    $("#results_button").toggleClass("hidden");
    console.log("done");
  }
}
