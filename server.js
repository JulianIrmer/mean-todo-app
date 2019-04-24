var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var ejs = require("ejs");
var path = require("path");
var cors = require("cors");

var index = require("./routes/index");
var tasks = require("./routes/tasks");

var server = express();
var port = process.env.PORT || 3000;

//Enable Cross-Origin
server.use(cors());

//View Engine
server.set("dist", path.join(__dirname, "./client/dist"));
server.set("view engine", "ejs");
server.engine("html", require("ejs").renderFile);

//Set Static Folder
server.use(express.static(path.join(__dirname, "./client/dist")));

//Body Parser MW
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));

server.use("/", index);
server.use("/api", tasks);

//Start Server
server.listen(port, function(){
	console.log("Server started on port "+port);
});
