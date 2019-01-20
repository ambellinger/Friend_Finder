//Dependencies
var express = require("express");

//Tells node that we are using an express server
var app = express();

//Sets the port
var PORT = process.env.PORT || 8080;


var connection = createConnection({
    host: "enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "epezy02o9civcuuo",
    password: "dv1pc80qq154cjw5",
    database: "bluywboqcoka6bg5"
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

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