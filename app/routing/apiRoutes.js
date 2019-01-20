// Load Data

var friends = require("../data/friends");

//Array Sort
var arraySort = require('array-sort');

//Routing

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


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