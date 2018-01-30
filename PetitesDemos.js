// -----------------------------------------------------
//	
//	
//	Petite démo de justification de texte.
//	Faust MARIA DE AREVALO 
//	2018 01 28
//	Licence CC-BY-NC-SA
//	
//	
//	-----------------------------------------------------
/*jshint esversion: 6 */
const http = require("http");
const url = require("url");
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
//const cookieParser = require('cookie-parser');

//	-----------------------------------------------------
const app = express();
app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.text());
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(cookieParser());


// -----------------------------------------------------
//	
//	Gestion session
//	
//	-----------------------------------------------------
//https://github.com/expressjs/session
var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	secret: 'trololololol321654987',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));

// req.session.regenerate(function(err) {});		// will have a new session here
// req.session.destroy(function(err) {});			// cannot access session here
// req.session.reload(function(err) {});            // session updated
// req.session.save(function(err) {});				// session saved

// -----------------------------------------------------
//	
//	Gestion des routes
//	
//	-----------------------------------------------------
apiJustify = require("./api/justify");
app.use("/api", apiJustify);

apiToken = require("./api/token");
app.use("/api", apiToken);

app.get("/ok", (req, res) => {
	console.log("Route 'ok' demandée.");
	res.sendFile(path.join(__dirname, '/pages/ok.html'));
});

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, '/pages/erreur.html'));
	console.log("Routes: Aucune route demandée.");
});
// -----------------------------------------------------
//	
//	Instaciation du serveur
//	
//	-----------------------------------------------------
var serveur = app.listen(8080, function () {
	const host = serveur.address().address;
	const port = serveur.address().port;
	console.log("---------------------------\nServeur NodeJS\nPort d'écoute: " + host + "," + port + "\n---------------------------\n\n\n\n\n\n\n\n\n");
});

