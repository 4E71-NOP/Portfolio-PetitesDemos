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
const bodyParserJson = require("body-parser");
const bodyParserTxt = require("body-parser");
const cookieParser = require('cookie-parser');
const request = require('request');

//	-----------------------------------------------------
const nexus = express();
nexus.use(cors());

// nexus.use(bodyParserJson.json());
// nexus.use(bodyParserJson.urlencoded({extended:false}));

nexus.use(bodyParserTxt.text());
nexus.use(bodyParserTxt.urlencoded({extended:false}));

nexus.use(cookieParser());

// -----------------------------------------------------
//	
//	Gestion session
//	
//	-----------------------------------------------------
//https://github.com/expressjs/session
var session = require('express-session')
nexus.set('trust proxy', 1) 							// Confiance dans le 1er proxy.
nexus.use(session({
	cookieName: 'PetDemSession',
	secret: 'trololololol321654987',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}));

// Les autres fonctions
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
nexus.use("/api", apiJustify);

apiToken = require("./api/token");
nexus.use("/api", apiToken);

nexus.get("/ok", (req, res) => {
	console.log(new Date(Date.now())+" Route 'ok' demandée.");
	res.sendFile(path.join(__dirname, '/pages/ok.html'));
});


// -----------------------------------------------------
//	
//	Test de requete http
//	
//	-----------------------------------------------------
nexus.get("/bounceAuth/:email", (req, res) => {
	console.log(new Date(Date.now())+" Route 'bounceAuth' demandée.");

	request('http://localhost:8080/api/token/toto@toto.fr', { json: true }, (err, result, body) => {
		if (err) { return console.log(err); }
		console.log(body.url);
		console.log(body.explanation);
		res.type("application/json");
		res.json({ "status": 200, "data": [{ "body": body }] });
	});
});

// A débugger
nexus.get("/bounceJustify/:cpl/:texte", (req, res) => {
	console.log(new Date(Date.now())+" Route 'bounceJustify' demandée.");
	console.log(req.params.cpl + "/" + req.params.texte);

	request("http://localhost:8080/api/justify/"+req.params.cpl+"/"+req.params.texte, { json: true }, (err, result, body) => {
	//request("http://localhost:8080/api/justify", { json: true }, (err, result, body) => {
		if (err) { return console.log(err); }
		console.log(body.url);
		console.log(body.explanation);
		res.type("application/json");
		res.json({ "status": 200, "data": [{ "body": body }] });
	});
});

// -----------------------------------------------------
//	
//	By your command... or not
//	
//	-----------------------------------------------------
nexus.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, '/pages/erreur.html'));
	console.log(new Date(Date.now())+" Routes: Aucune route demandée.");
});

// -----------------------------------------------------
//	
//	Instaciation du serveur
//	
//	-----------------------------------------------------
const serveurPort =  process.env.PORT || 8080;
const serveurIp = "127.0.0.1";

var serveur = nexus.listen(serveurPort, function () {
	const host = serveur.address().address;
	const port = serveur.address().port;
	console.log("---------------------------\nServeur NodeJS\nPort d'écoute: " + host + "," + port + "\n---------------------------\n\n\n\n\n\n\n\n\n");
});
