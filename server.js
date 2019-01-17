//Dependencies
var express = require("express");

//Tells node that we are using an express server
var app = express();

//Sets the port
var PORT = process.env.PORT || 8080;

//sets up express to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Router

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Listener
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
})