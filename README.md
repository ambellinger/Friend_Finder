# FriendFinder
FriendFinder helps you find a new friend. After answering a set of questions from a range of strongly disagree to strongly agree, you can match with some of the cutest, cuddlest pet friends. Once you finish answering, you are also added to the friend database so someone can match with you!

## Technologies Used
* Javascript
* Bootstrap
* node.JS
* ArraySort (NPM install)
* path (NPM install)
* express (NPM install)


## Outside APIs Used
* none

## Prerequisites
* NPM install (See Tech Used section above)

## How Does It Work?

You land first on the home page.
![homepage](/images/friendfinderhomepage.PNG)

After answering a series of questions...
![questions](/images/surveyquestions.PNG)

You are matched with a friend
![match](/images/surveymatch.PNG)

You are then added to the friends api
![api](/images/friendsapi.PNG)


### How to build Friend Finder

The first thing you do is set up the server.

```
//Dependencies
var express = require("express");

//Tells node that we are using an express server
var app = express();

//Sets the port
var PORT = process.env.PORT || 8080;

//sets up express to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Listener
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
})
```


Next write your questions in a form format.

```
                         <h4>Questions 1</h4>
                        <label for="question1">Would you say you like to cuddle a lot?</label>
                        <select id="question1" class="form-control">
                            <option selected>Select an Option</option>
                            <option value="1">1 - Strongly Disagree</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5 - Strongly Agree</option>
                        </select>

```


The application needs not only a set of pre-entered friends but a place to add friends as they get entered into the temporary database.

An array of objects must be created with the properties that need to be filled out: the name of the friend, their photo, and their answers (scores) to the questions.

``` 
var friends = [
    {
        "name": "Koko",
        "photo": "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/17353601_214071042406729_6225125509036451616_n.jpg?_nc_cat=100&_nc_ht=scontent-ort2-1.xx&oh=b0a63f8efeadceb3f9ddc54eeeb28228&oe=5CBE7748",
        "scores": [
            5,
            5,
            2,
            5,
            2,
            2,
            3,
            1,
            1,
            4
        ]

    },

module.exports = friends;

```
After the basic html pages have been built, including the form with the survey questions, routes are created to link everything together utilizing npm path.

```
//Dependencies
var path = require("path");

//Routing

module.exports = function(app) {
    app.get("/survey", function(req, res) {
       // res.send("Survey");
        res.sendFile(path.join(__dirname, "../public/survey.html"));
      });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
}

```

The user's answers must be saved from the form when they click the submit button.

```
  $(".submit").on("click", function (event) {
        event.preventDefault();

        // Here we grab the form elements
        var usersAnswers = {
            userName: $("#usersName").val().trim(),
            userPhoto: $("#usersPhoto").val().trim(),
            scores: [ $("#question1").val(),
                     $("#question2").val(),
                     $("#question3").val(),
                     $("#question4").val(),
                     $("#question5").val(),
                     $("#question6").val(),
                     $("#question7").val(),
                     $("#question8").val(),
                     $("#question9").val(),
                     $("#question10").val() ]

        };
```

On the server side, they are then compared to the saved friend's answers. By comparing the absolute differences, the friend with the least difference with the user is then presented as the best match.

```
app.post("/api/friends", function (req, res) {
        var usersAnswers = req.body;
        var usersScores = usersAnswers.scores;


        var Totaldifference = [];
        var results = 0;
        totalResult = 0;

        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);

            results=0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                results += Math.abs(parseInt(usersScores[j]) - parseInt(friends[i].scores[j]));

                
               // console.log("total results" + friendResult);
            }
            Totaldifference.push({ name: friends[i].name, photo: friends[i].photo, friendResult: Math.abs(results) });
            console.log("results" + results);
        }
       
                
        console.log(usersScores);
        console.log(usersAnswers);
        friends.push(usersAnswers);
        
     
      arraySort(Totaldifference, 'friendResult');
      console.log("Closest match:" + Totaldifference[0].name);

        return res.json(Totaldifference[0]);
    })

}
```

The result is then presented on the client side in the form of a modal.

```

         $.post("/api/friends", usersAnswers,
              function (data) {

                $("#modal-name").text(data.name);
                $("#modal-photo").attr("src", data.photo);
                $("#modal-photo").attr("width", "50%")
                $(".modal").modal("toggle");

             });


```


## Challenges and Future Improvements
Understanding the routing and going back and forth between the client and server side was extremely confusing. I had a hard time really grasping exactly what I was doing.

In terms of improvements, I would definately improve upon the appearance of the website. It's rather unappealling looking.

## Acknowlegments 
I want to recognize Phil's contribution to helping create the mathematical equation to find the closest match. Also, I want to acknowledge Zach Garcia's help with getting the modal to work. 