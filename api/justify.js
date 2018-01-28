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

// const http = require ("http");
// const url = require ("url");
const path = require ("path");
// const cors = require ("cors");
//const app = express();
const express = require ("express");
const nexus = express.Router();

//	-----------------------------------------------------
// app.use(cors());
console.log ("fin configuration API");


// -----------------------------------------------------
//	
//	Gestion des routes
//	
//	-----------------------------------------------------
nexus.post ("/justify", (req, res) => {
    console.log("Route 'Justify' demandée.");
    const post = {
		texte : req.body.texte,
        cpl : req.body.cpl,
    };
	//console.log(post);

	post.texte += "\n";													// Pose une fin de ligne pour éviter un correction malvenue sur la derniere ligne.
	post.texte.replace ("/\n+/g", " \n ");								// Isole les '\n' => plus clair.
	var TexteEclate = post.texte.split(" ");
//	console.log(TexteEclate);

	var CptrMots = ptr = finligne = RetourChariot = strlen_sauve = 0;
	var expr = expr_sauve = "";
	var tab_ligne = [];
	var elm, elementEnCours;

	for ( elm in TexteEclate ) {
		elementEnCours = TexteEclate[elm];
		if (elementEnCours.indexOf("\n") != -1 ) { 								// Cas particulier du retour chariot
			expr += (CptrMots == 0 ) ? elementEnCours : " "+elementEnCours;					// premier mot de ligne = pas d'espace
			if (expr.length > cpl) { finligne = 1; }		// ca dépasse ou pas?

			else {														// Non -> accumulation dans tampons
				CptrMots++;
				strlen_sauve = mb_strlen($expr,"UTF-8");
				expr_sauve = expr;
			}
		}
		else { 															// Oui -> le bac est plein
			RetourChariot = 1;
			finligne = 1; 
		}

		if (finligne == 1) {											// Remplisage terminé -> sauvegarde et préparation ligne suivante
			tab_ligne[ptr].nbrmot	= CptrMots;
			tab_ligne[ptr].carspe	= RetourChariot;
			tab_ligne[ptr].strlen	= strlen_sauve;
			tab_ligne[ptr].expr		= expr_sauve;

			expr = (RetourChariot == 1) ? "" : elementEnCours;
			CptrMots = (RetourChariot == 1) ? 0 : 1 ;
			finligne = RetourChariot = 0;
			ptr++;
		}
	}

	// Derniere ligne a faire
	ptr++;
	tab_ligne[ptr].nbrmot	= CptrMots;
	tab_ligne[ptr].carspe	= 0;
	tab_ligne[ptr].strlen	= strlen_sauve;
	tab_ligne[ptr].expr		= expr_sauve;

	console.log(TexteEclate);

});

nexus.get ("/*", (req, res) => {
    res.sendFile(path.join(__dirname,'../pages/erreur.html'));
    console.log("Aucune route demandée.");
});

// -----------------------------------------------------
//	
//	Le truc qu'on oublie tout le temps
module.exports = nexus;

