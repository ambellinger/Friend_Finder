// Load Data

var friends = require("../data/friends");

//Routing

module.exports = function(app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function(req, res) {
        var user = req.body;
        var usersScores = user.scores;

        console.log(usersScores);
        console.log(user);
       friends.push(user);
    })


}