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
const path = require("path");
const express = require("express");
const token = express.Router();

// -----------------------------------------------------
//	
//	Gestion des routes
//	
//	-----------------------------------------------------
token.get("/token/:email", (req, res) => {
	console.log(new Date(Date.now())+" Route GET 'token' +1 argument demandée.");

	var email = req.params.email;
	if ( !req.session.dejavu ) {
		req.session.dejavu = 1;
		req.session.debut = new Date(Date.now());
		req.session.cookie.maxAge = 24*3600000;
		req.session.email = email;
		req.session.SessionActuelle = req.sessionID;
		console.log(new Date(Date.now())+" Mise a jour de la session");
	}

	res.type("application/json");
	if (email.length > 0) {
		res.json({ "status": 200, 
		"session":req.session,
		});
	}
	else {
		res.json({ "status": 200, "data": [{ "email": "NO-OK" }] });
	}
});

token.get("/token", (req, res) => {
	console.log(new Date(Date.now())+" Route GET 'token' sans argument demandée.");
	res.send("Pas de vérification possible");
});

token.post("/token", (req, res) => {
	console.log(new Date(Date.now())+" Route POST 'token'");
	var email = req.body.email;
	if (email.length > 0) {
		res.type("application/json");
		res.json({ "status": 200, "data": [{ "email": email }] });
	}
});

// -----------------------------------------------------
//	
//	Le truc qu'on oublie tout le temps
module.exports = token;


