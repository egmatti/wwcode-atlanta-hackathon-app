# Inhabit

Inhabit is an interactive quiz that grades the environmental impact of your habits and offers tips for improvement. 

[<b>Demo Site</b>](https://aliciawyse.github.io/wwcode-atlanta-hackathon-app/)

Users can identify themselves with an email address and password. Then they can click through a quiz that gauges specific habits that impact the environment, such as recycling, food waste, household lighting and plant rich diets. 

We believe a future version of Inhabit could help people gain a clearer picture of their environmental impact. Green companies may be interested in our customer data as well.


## Authors

* [**Alicia Barrett**](https://github.com/Aliciawyse)
* [**Emily Mattison**](https://github.com/egmatti)
* [**Katie Brennan**](https://github.com/quantumbebop)
* [**Debby McRae**](https://github.com/roxie1000)
* **Naz Sodanbek**

## Built With

* JavaScript ES5
* jQuery 3.2.1
* HTML5/CSS3
* Adobe Illustrator CC
* Firebase

## Development Process

1. Initial Planning

We wanted to use APIs to grab carbon emission data. But that was difficult due to the timeline of the hackathon and most were not free. We reset our expectations, creating an outline of what our minimally viable product would look like. We moved forward with building a sign in page, a quiz, a page that reveals the user's score and pages that include specific tips. 

2. Challenges and Successes

Each of us took on a particular piece of the application. For example, I wrote code to identify app users by implementing Firebase's user authentication & NoSQL cloud database. Separating tasks was key to our success, but we should have tested our code together more often to avoid last minute merge conflicts and errors. 

The implementation of Firebase was a success. Here's a brief overview of how that was accomplished. 

An important first step to using Firebase is initializing the database. 

```javascript
function init() {
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
```

On the sign up page, after initializing the database, I use `function createUserData ()` to store values from the input fields on the `sign-up.html` file in our database.  

```javascript
function createUserData (){
    //Grabs user input from form
    var userFirstName = $("#firstName").val().trim();
    var userLastName = $("#lastName").val().trim();
    var userEmail = $("#email").val().trim();
    var userPassword = $("#password").val().trim();
    
    //Authenticate with Firebase using password-based accounts
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
      .then(function(user) {
          console.log("User created!!!");
          if (user) {
              console.log("User has successfully signed in!!!" + JSON.stringify(user));
    
                //Save user information to database
              firebase.database().ref('users/' + user.uid).set({
                  userFirstName: userFirstName,
                  userLastName: userLastName,
                  userEmail: userEmail,
                  userPassword: userPassword
              });
    
              //Save user's unique Firebase id to local storage.
              window.localStorage.setItem("drawdownToken", user.uid);
              }
      });
    }
```

In the `quiz.html` file, I have to initialize my database again. Once the user is done with the quiz, the results are stored in an array. Using the token that Firebase generates for a user once they sign in, we can reference a specific location in our database (unique to the user) and save their quiz results.  

```javascript

//Grab the user's token provided upon signing in by Firebase
      var userUid = window.localStorage.getItem("drawdownToken");

      //This code references a specific location in our database.
      firebase.database().ref('users/' + userUid).update({
          //quizResults: results,
          cleanResults: cleanResults,
          categoryScores: categories,
          totalScore: totalPoints
      });
```

3. What would I do differently?

Storing a user's database token is not a good idea (but was an approach taken to quickly showcase functionality). I'd revisit more secure options. 

## Instructions Development
Git clone this repository to your local machine. 

