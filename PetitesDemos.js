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

const http = require ("http");
const url = require ("url");
const path = require ("path");
const cors = require ("cors");
const express = require ("express");
const bodyParser = require("body-parser");

//	-----------------------------------------------------
const app = express();
app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:false}));

// -----------------------------------------------------
//	
//	Gestion des routes
//	
//	-----------------------------------------------------
apiJustify = require("./api/justify");
app.use ("/api", apiJustify);

app.get ("/ok", (req, res) => {
    console.log("Route 'ok' demandée.");
    res.sendFile(path.join(__dirname,'/pages/ok.html'));
});

app.get ("/", (req, res) => {
    res.sendFile(path.join(__dirname,'/pages/erreur.html'));
    console.log("Aucune route demandée.");
});
// -----------------------------------------------------
//	
//	Instaciation du serveur
//	
//	-----------------------------------------------------
var serveur = app.listen(8080, function () {
    const host = serveur.address().address;
    const port = serveur.address().port;
    console.log("---------------------------\nServeur NodeJS\nPort d'écoute: "+host+","+port+"\n---------------------------\n\n\n\n\n\n\n\n\n");
});

