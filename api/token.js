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
token.get("/validation/:email", (req, res) => {
	console.log("Route GET 'validation' sans argument demandée.");
	var email = req.params.email;

	if ( !req.session.cookie.maxAge ) {
		//req.session.cookie.expires = new Date(Date.now() + hour);
		req.session.cookie.maxAge = 24*3600000;
		req.session.cookie.email = email;
	}

	res.type("application/json");
	if (email.length > 0) {
		res.json({ "status": 200, 
		"data": req.session.cookie,
		"id":req.sessionID,
		"email":req.session.cookie.email,
	});
	}
	else {
		res.json({ "status": 200, "data": [{ "email": "NO-OK" }] });
	}
});

token.get("/validation", (req, res) => {
	console.log("Route GET 'validation' sans argument demandée.");
	res.send("Pas de vérification possible");
});

token.post("/validation", (req, res) => {
	console.log("Route POST 'validation'");
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


