//	-----------------------------------------------------
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
// const bodyParserTxt = require("body-parser");
const cookieParser = require('cookie-parser');
const request = require('request');

//	-----------------------------------------------------
const nexus = express();
nexus.use(cors());

nexus.use(bodyParserJson.json());
nexus.use(bodyParserJson.urlencoded({extended:false}));
// nexus.use(bodyParserTxt.text());
// nexus.use(bodyParserTxt.urlencoded({extended:false}));
nexus.use(cookieParser());

//	-----------------------------------------------------
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

//	-----------------------------------------------------
//	
//	Gestion des routes
//	
//	-----------------------------------------------------

//	-----------------------------------------------------
//	
//	Gestion des routes /JUSTIFY
//	
//	-----------------------------------------------------
nexus.get("/api/justify/:cpl/:texte", (req, res) => {
	console.log(new Date(Date.now())+" Route GET 'Justify/+args' demandée.");
	const post = {
		texte: req.params.texte,
		cpl: req.params.cpl,
	};
	console.log (JustifieTexte(post));
	res.type("text/plain");
	res.send(JustifieTexte(post));
});

nexus.get("/api/justify", (req, res) => {
	console.log(new Date(Date.now())+" Route GET 'Justify' sans argument demandée.");
	res.type("text/plain");
	res.send(JustifieTexte(soumissionVide));
});

nexus.post("/api/justify", (req, res) => {
	console.log(new Date(Date.now())+" Route POST 'Justify' demandée.");
	var post = {};
	post.texte = "";
	post.cpl = 80;													// Par défaut
	if (req.readable) {												// Sencé Reconnaitre le type de données du POST
		console.log(new Date(Date.now())+" Mode POST-Text/plain");
		var textPlain = "";
		req.on('data', function (data) { textPlain += data; });
		req.on('end', function () {
			post.texte = textPlain.replace(/texte=/g, "");
			post.cpl = 80;
			res.type("text/plain");
			res.send("Mode POST-Text/plain\n"+JustifieTexte(post));
		});
	}
	else {
		console.log(new Date(Date.now())+" Mode POST-BODY");
		post.texte = req.body.texte;
		post.cpl = req.body.cpl;
		res.type("text/plain");
		res.send("Mode POST-BODY\n"+JustifieTexte(post));
	}
});


// -----------------------------------------------------
//	
//	Gestion des routes /TOKEN
//	
//	-----------------------------------------------------
nexus.get("/api/token/destroysession", (req, res) => {
	req.session.destroy(function(err) {
		console.log(new Date(Date.now())+" Route GET 'token/destroysession' demandée.");
		res.json({ "status": 200, "data": "bye bye session"});
  });
});

nexus.get("/api/token/:email/:pass", (req, res) => {
	console.log(new Date(Date.now())+" Route GET 'token +2 arguments' demandée.");

	var sessionElm = {};
	sessionElm.email = req.params.email;
	sessionElm.pass = req.params.pass;

	if ( sessionElm.email.length > 0 && sessionElm.pass.length > 0 ) { 
		var verification = GestionSession ( "AuthLogPass" , req , sessionElm ); 

		if ( verification == "GetAwayNoob") {
			res.json({ "status": 402, "data": [{ "email": "Gimme the loot!!" }] });
		}
		if ( verification == "auth-OK") {
			res.json({ "status": 200,
			"message":"Vous êtes authentifié.",
			"session":req.session,
			});
		}
		if ( verification == "auth-KO") {
			res.json({ "status": 401,
			"message":"Echec de l'authentification.",
			"session":req.session,
			});
		}
	}
	else {
		res.sendFile(path.join(__dirname, '/pages/token_parametreabsent.html'));
	}
});

nexus.get("/api/token/:a", (req, res) => {
	console.log(new Date(Date.now())+" Route GET 'token avec 1 seul argument' demandée.");
	res.sendFile(path.join(__dirname, '/pages/token_parametreabsent.html'));
});
nexus.get("/api/token", (req, res) => {
	console.log(new Date(Date.now())+" Route GET 'token sans argument' demandée.");
	res.sendFile(path.join(__dirname, '/pages/token_parametreabsent.html'));
});
/*
nexus.post("/api/token", (req, res) => {
	console.log(new Date(Date.now())+" Route POST 'token'");
	var email = req.body.email;
	if (email.length > 0) {
		res.type("application/json");
		res.json({ "status": 200, "data": [{ "email": email }] });
	}
});
*/
//	-----------------------------------------------------
//	
//	EN TEST
//	Test de requete http sur elle même
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
nexus.get("/ok", (req, res) => {
	console.log(new Date(Date.now())+" Route 'ok' demandée.");
	res.sendFile(path.join(__dirname, '/pages/ok.html'));
});

nexus.get("/formJustify01", (req, res) => {
	console.log(new Date(Date.now())+" Route 'ok' demandée.");
	res.sendFile(path.join(__dirname, '/pages/html_justify_test_defaut.html'));
});

nexus.get("/formJustify02", (req, res) => {
	console.log(new Date(Date.now())+" Route 'ok' demandée.");
	res.sendFile(path.join(__dirname, '/pages/html_justify_test_plaintext.html'));
});

nexus.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, '/pages/menu_principal.html'));
	console.log(new Date(Date.now())+" Routes: Aucune route demandée.");
});

nexus.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, '/pages/erreur.html'));
	console.log(new Date(Date.now())+" Routes: Aucune route demandée.");
});

//	-----------------------------------------------------
//	
//	Fonction de gestion de la session en cours
//	
//	-----------------------------------------------------
var SimulationBDD = {
	'toto@toto.fr':{ sessionID:'', email:'toto@toto.fr', pass:'toto', CompteurMots:0 },
	'tata@tata.fr':{ sessionID:'', email:'tata@tata.fr', pass:'tata', CompteurMots:0 }
};

function GestionSession ( commande , req , obj ) {
	switch ( commande ){
		case "AuthLogPass":
		if ( SimulationBDD[obj.email] ) {
			if (SimulationBDD[obj.email].pass === obj.pass ) { 
				var reponse = "auth-OK"; 
				if ( !req.session.dejavu ) {
					req.session.authok = 1;
					req.session.dejavu = 1;
					req.session.debut = new Date(Date.now());
					req.session.cookie.maxAge = 24*3600000;
					req.session.email = obj.email;
					req.session.CompteurMots = 0;
					req.session.SessionActuelle = req.sessionID;

					SimulationBDD[obj.email].sessionID = req.sessionID;
					console.log(new Date(Date.now())+"GestionSession: Mise a jour de la session");
				}
			}
			else { var reponse = "auth-KO"; }
			console.log ("GestionSession : " + reponse);
			// console.log (SimulationBDD[obj.email]);
			// console.log (obj);
		}
		break;

		case "VerifAuth":
		if ( SimulationBDD[obj.email] ) {
			if ( req.sessionID == SimulationBDD[obj.email].sessionID ) {
				console.log(new Date(Date.now())+"GestionSession: VerifAuth ok");
				var reponse = "auth-OK";
			}
			else {
				console.log(new Date(Date.now())+"GestionSession: VerifAuth KO");
				var reponse = "auth-KO";
			}
		}
		break;

		case "AjoutCompteurMot":
			SimulationBDD[obj.email].CompteurMots += obj.nbrMots
			req.session.CompteurMots += obj.nbrMots;
		break;

		case "Authorisation":
			if ( req.session.CompteurMots > 80000 ) {
				var reponse = "GetAwayNoob";
			}
		break;
	}
	if ( reponse ) { return reponse; }
}

// -----------------------------------------------------
//	
//	
//	Fonction de justification de texte en mode ascii
//	
//	
//	-----------------------------------------------------
var soumissionVide = {};
soumissionVide.texte = "** Mode réduit / Limitation de service\n** Vous devez être un utilisateur connu\n** 40 colonnes\n"+
"Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint.\n";
soumissionVide.cpl = 40;

function ArrondiPrecisionVariable(n, precision) {
	var f = Math.pow(10, precision);
	return Math.round(n * f) / f;
}

function JustifieTexte(post) {
	const debug = "";

	post.texte += " \n";														// Pose une fin de ligne pour éviter un correction malvenue sur la derniere ligne.
	post.texte = post.texte.replace(/\n/g, " \n ");								// Isole les '\n' => plus clair.
	var TexteEclate = post.texte.split(" ");

	var CptrMots = ptr = finligne = RetourChariot = strlen_sauve = diff = CoefEspace = compensation = n = 0;
	var expr = expr_sauve = exprdbug = "";
	var tab_ligne = {};
	var elm, elementEnCours, obj;

	for (elm in TexteEclate) {
		elementEnCours = TexteEclate[elm];
		if (elementEnCours.indexOf("\n") == -1) { 								// Cas particulier du retour chariot
			expr += (CptrMots == 0) ? elementEnCours : " " + elementEnCours;	// premier mot de ligne = pas d'espace
			if (expr.length > post.cpl) { finligne = 1; }						// ca dépasse ou pas?

			else {																// Non -> accumulation dans tampons
				CptrMots++;
				strlen_sauve = expr.length;
				expr_sauve = expr;
			}
		}
		else { 																	// Oui -> le bac est plein
			RetourChariot = 1;
			finligne = 1;
		}

		if (finligne == 1) {													// Remplisage terminé -> sauvegarde et préparation ligne suivante
			tab_ligne[ptr] = {};
			tab_ligne[ptr].nbrmot = CptrMots;
			tab_ligne[ptr].carspe = RetourChariot;
			tab_ligne[ptr].strlen = strlen_sauve;
			tab_ligne[ptr].expr = expr_sauve;
			expr = (RetourChariot == 1) ? "" : elementEnCours;
			CptrMots = (RetourChariot == 1) ? 0 : 1;
			finligne = 0;
			RetourChariot = 0;
			ptr++;
		}
	}

	// Derniere ligne a faire
	tab_ligne[ptr] = {};
	tab_ligne[ptr].nbrmot = CptrMots;
	tab_ligne[ptr].carspe = RetourChariot;
	tab_ligne[ptr].strlen = strlen_sauve;
	tab_ligne[ptr].expr = expr_sauve;

	// -----------------------------------------------------
	//	2eme phase de traitement
	var rendu = "";
	const rep = " ";

	if (debug == "Stat") { rendu = rep.repeat(post.cpl) + "\t\t|Mots\t|Len\t|Coef\t|espace\t|comp\n"; }
	ptr = 0;
	for (elm in tab_ligne){
		CoefEspace = 0;
		
		if (tab_ligne[elm].strlen > Math.floor(post.cpl * 0.75)) {	// Si pas assez long on ne justifie pas. Pa bo!
			diff = post.cpl - tab_ligne[elm].strlen;				// Forge du coef à accumuler
			CoefEspace = (tab_ligne[elm].nbrmot != 1) ? ArrondiPrecisionVariable( diff/(tab_ligne[elm].nbrmot - 1), 4 ) : 0;
		}
		expr = "";
		EspaceCptr = 0;

		for (i=1; i<=tab_ligne[elm].nbrmot; i++) {					// Commence la ligne
			if (EspaceCptr >= 1 && i > 1) {
				n = Math.floor(EspaceCptr);
				if ( (n + 1 + expr.length + TexteEclate[ptr].length) > post.cpl) { n--; }
				expr += rep.repeat(n);
				EspaceCptr -= n;
			}
			EspaceCptr += CoefEspace;
			if (i == tab_ligne[elm].nbrmot) { 						// Compense pour le dernier mot. 
				compensation = post.cpl - (1 + expr.length + TexteEclate[ptr].length);
				if (compensation > 0 && tab_ligne[elm].carspe == 0) {
					expr += rep.repeat(compensation);
				}
			}
			expr += (i == 1) ? "" : " ";							// Espace naturel entre les mots.
			expr += TexteEclate[ptr];								// Mot
			ptr++;
		}
		if (tab_ligne[elm].carspe == 1) {							// Retour à la ligne
			ptr++;
			expr += "\n";
		}
		if ( debug == "Stat") { rendu += expr + "\t\t|" + tab_ligne[elm].nbrmot + "\t|" + expr.length + "\t|" + CoefEspace + "\t|" + EspaceCptr + "\t|" + compensation + "\n"; }		// Debug crasseux pour controle.
		else { rendu += expr + "\n"; }								// Accumulation du résultat

		expr = "";
	//	SessionCompteurMot += tab_ligne[elm].nbrmot;				// Comptage 
	}
	return rendu;
}


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
