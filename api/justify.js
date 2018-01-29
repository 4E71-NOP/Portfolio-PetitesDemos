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
const path = require("path");
const express = require("express");
const nexus = express.Router();

//	-----------------------------------------------------
// app.use(cors());
console.log("fin configuration API");

// -----------------------------------------------------
//	
//	Fonction de justification de texte en mode ascii
//	
//	-----------------------------------------------------
var soumissionVide = {};
soumissionVide.texte = "********Sousmission vide********\n"+
"Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint.\n"+
"Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé.Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour. \n"+
"Loreméé ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit orci at sagittis ultrices. Mauris commodo blandit elit, eget rutrum lacus. Sed ultricies leo tincidunt mauris accumsan, sit amet pellentesque dui vulputate. Aliquam mollis diam id facilisis varius. Curabitur eget pretium velit. Sed in tempor ex. Integer blandit elit vitae lacinia tempus. Nullam dapibus, ligula ut imperdiet efficitur, mauris lacus rutrum arcu, sed egestas erat leo in nulla. Quisque tincidunt ex nunc, quis malesuada dolor pretium sed. Suspendisse convallis feugiat congue. Pellentesque dapibus magna elementum, semper nisl nec, blandit odio. Pellentesque odio lectus, sagittis sed laoreet quis, egestas eu dui. Mauris elementum quis metus vel ornare. Curabitur egestas id sem porta volutpat.\n"+
"Etiam iaculis felis in arcu porta eleifend. Donec sit amet odio nulla. Nulla aliquet tincidunt turpis, sit amet volutpat nisl sodales in. Ut consectetur nec nulla nec dictum. Pellentesque volutpat egestas est. Cras tincidunt ex interdum, pellentesque mauris quis, tincidunt erat. Sed ullamcorper turpis a consequat dictum. Duis laoreet ultrices eros, sed blandit nibh fringilla et. Aenean interdum sapien eu congue scelerisque. Sed sodales lorem sed sodales hendrerit. Nullam quis tortor vitae ex placerat semper a tristique orci. Nulla elit nulla, vestibulum id consequat in, suscipit non lorem. Suspendisse id quam ac libero facilisis facilisis in quis lorem. Suspendisse fermentum, magna et dictum malesuada, lacus leo lacinia sapien, non dictum arcu orci vitae lectus. Ut auctor dictum metus nec mollis. Curabitur bibendum rutrum lectus eget interdum. \n"+
"In et mollis erat, at lacinia dui. Fusce non dapibus diam. Pellentesque in eleifend turpis, vitae congue ligula. Cras placerat interdum eleifend. Aliquam tellus odio, rhoncus et suscipit ut, mattis feugiat eros. Maecenas egestas sodales mauris ut tincidunt. Sed mauris nunc, tempus vitae iaculis vitae, dapibus vel est.\n"+
"In pulvinar ipsum eu tellus fringilla pretium. Duis ornare blandit lectus, id aliquam eros lacinia sed. Suspendisse nec molestie nunc, et sodales purus. Sed bibendum eros vel leo bibendum, vitae pharetra eros tempus. Proin convallis massa eget convallis molestie. Proin tempus ac diam in fringilla. Suspendisse rhoncus semper augue, non sagittis mi porta et. Aenean eu aliquet eros, at dignissim sapien. Quisque suscipit molestie rutrum. Donec in lectus ac metus hendrerit ultricies. Sed a ipsum nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n"+
"Curabitur volutpat eleifend nunc id volutpat. Fusce a libero ligula. Curabitur in nunc ac lacus ultricies volutpat sed non nunc. Integer eu magna in velit tincidunt aliquet eget ac velit. Nam rutrum arcu id odio semper, quis egestas velit vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque tempor mattis est, vel commodo sapien blandit quis. Proin malesuada quam venenatis nulla eleifend pretium. Aenean quis ex semper, interdum nunc eget, condimentum est. Proin venenatis quis mauris et accumsan. Donec placerat neque sit amet sodales imperdiet. Etiam diam libero, vestibulum vitae suscipit ultrices, vestibulum nec justo. Phasellus congue mi convallis scelerisque semper.\n";
soumissionVide.cpl = 80;

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
//	Gestion des routes
//	
//	-----------------------------------------------------
nexus.get("/justify/:cpl/:text", (req, res) => {
	console.log("Route GET 'Justify/+args' demandée.");
	const post = {
		texte: req.params.texte,
		cpl: req.params.cpl,
	};
	console.log (JustifieTexte(post));
});

nexus.get("/justify", (req, res) => {
	console.log("Route GET 'Justify' sans argument demandée.");
	res.type("text/plain");
	res.send(JustifieTexte(soumissionVide));
});

nexus.post("/justify", (req, res) => {
	console.log("Route POST 'Justify' demandée.");
	var post = {};
	if ( req.body ) {
		console.log("Mode POST-BODY");
		post = {
		texte: req.body.texte,
		cpl: req.body.cpl,
	};
	}
	else {
		console.log("Mode POST-Text/plain");
		var textPlain = "";
		req.on('data', function (data) { textPlain += data; });
		req.on('end', function () {
			post = {
				texte: JSON.parse(textPlain),
				cpl: 80,												//valeur par défaut
			};
		});
	}
	res.type("text/plain");
	res.send(JustifieTexte(post));
});

nexus.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/erreur.html'));
	console.log("Aucune route demandée.");
});

// -----------------------------------------------------
//	
//	Le truc qu'on oublie tout le temps
module.exports = nexus;

