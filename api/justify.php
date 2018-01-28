<?php
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
$LimiteMot = 80000;
$SessionCompteurMot = 0;

if ( isset($_REQUEST['depuisFormulaire'])){
	if ( $_SESSION['consomation_mot'] > $LimiteMot ) {
		$forbidden402 = 1;
	}
}
else {
	ini_set ("display_errors", 1 );
	error_reporting(E_ALL);
	session_start();

	if ( !isset($_REQUEST['cpl'])) { $_REQUEST['cpl'] = 80;}
	if ( !isset($_REQUEST['debug'])) { $_REQUEST['debug'] = "";}
	if ( !isset($_REQUEST['texte'])) {
	$_REQUEST['texte'] = "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint.
Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé.Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour. 
Loreméé ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit orci at sagittis ultrices. Mauris commodo blandit elit, eget rutrum lacus. Sed ultricies leo tincidunt mauris accumsan, sit amet pellentesque dui vulputate. Aliquam mollis diam id facilisis varius. Curabitur eget pretium velit. Sed in tempor ex. Integer blandit elit vitae lacinia tempus. Nullam dapibus, ligula ut imperdiet efficitur, mauris lacus rutrum arcu, sed egestas erat leo in nulla. Quisque tincidunt ex nunc, quis malesuada dolor pretium sed. Suspendisse convallis feugiat congue. Pellentesque dapibus magna elementum, semper nisl nec, blandit odio. Pellentesque odio lectus, sagittis sed laoreet quis, egestas eu dui. Mauris elementum quis metus vel ornare. Curabitur egestas id sem porta volutpat.
Etiam iaculis felis in arcu porta eleifend. Donec sit amet odio nulla. Nulla aliquet tincidunt turpis, sit amet volutpat nisl sodales in. Ut consectetur nec nulla nec dictum. Pellentesque volutpat egestas est. Cras tincidunt ex interdum, pellentesque mauris quis, tincidunt erat. Sed ullamcorper turpis a consequat dictum. Duis laoreet ultrices eros, sed blandit nibh fringilla et. Aenean interdum sapien eu congue scelerisque. Sed sodales lorem sed sodales hendrerit. Nullam quis tortor vitae ex placerat semper a tristique orci. Nulla elit nulla, vestibulum id consequat in, suscipit non lorem. Suspendisse id quam ac libero facilisis facilisis in quis lorem. Suspendisse fermentum, magna et dictum malesuada, lacus leo lacinia sapien, non dictum arcu orci vitae lectus. Ut auctor dictum metus nec mollis. Curabitur bibendum rutrum lectus eget interdum. 
In et mollis erat, at lacinia dui. Fusce non dapibus diam. Pellentesque in eleifend turpis, vitae congue ligula. Cras placerat interdum eleifend. Aliquam tellus odio, rhoncus et suscipit ut, mattis feugiat eros. Maecenas egestas sodales mauris ut tincidunt. Sed mauris nunc, tempus vitae iaculis vitae, dapibus vel est.
In pulvinar ipsum eu tellus fringilla pretium. Duis ornare blandit lectus, id aliquam eros lacinia sed. Suspendisse nec molestie nunc, et sodales purus. Sed bibendum eros vel leo bibendum, vitae pharetra eros tempus. Proin convallis massa eget convallis molestie. Proin tempus ac diam in fringilla. Suspendisse rhoncus semper augue, non sagittis mi porta et. Aenean eu aliquet eros, at dignissim sapien. Quisque suscipit molestie rutrum. Donec in lectus ac metus hendrerit ultricies. Sed a ipsum nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Curabitur volutpat eleifend nunc id volutpat. Fusce a libero ligula. Curabitur in nunc ac lacus ultricies volutpat sed non nunc. Integer eu magna in velit tincidunt aliquet eget ac velit. Nam rutrum arcu id odio semper, quis egestas velit vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque tempor mattis est, vel commodo sapien blandit quis. Proin malesuada quam venenatis nulla eleifend pretium. Aenean quis ex semper, interdum nunc eget, condimentum est. Proin venenatis quis mauris et accumsan. Donec placerat neque sit amet sodales imperdiet. Etiam diam libero, vestibulum vitae suscipit ultrices, vestibulum nec justo. Phasellus congue mi convallis scelerisque semper.";
	}

	header("Content-Type: text/plain; charset=UTF-8");
	if ( $_SESSION['consomation_mot'] > $LimiteMot ) { 
		header("HTTP/1.1 402 Payment Required" ); 
		exit(0);
		}
	else { header("Status: 200 OK"); }
}


if ( !isset($forbidden402)) { 
// -----------------------------------------------------
//	
//	
//	Initialisation des données 
//	
//	
	$cpl = &$_REQUEST['cpl'];													// Caractère par ligne
	$debug = &$_REQUEST['debug'];
	$_REQUEST['texte'] .= "\n";													// Pose une fin de ligne pour éviter un correction malvenue sur la derniere ligne.
	$_REQUEST['texte'] = preg_replace( "/\n+/", " \n " , $_REQUEST['texte']);	// Isole les '\n' => plus clair.
	$TexteEclate = preg_split ( "/ +/" , $_REQUEST['texte']);

	if ( $debug == "init" ) { echo (print_r($TexteEclate)); }

// -----------------------------------------------------
//	
//	
//	Premiere phase de traitmeent 
//	Cartographie la chaine dans une table qui 
//		donne le nombre de mot maximum par ligne 
//		donne la longeur de la chaine sans ajout d'espace
//		Signale le '\n' -> permet gestion du stigmat
//	
//	
	$CptrMots = $ptr = $finligne = $RetourChariot = 0;
	$expr ="";
	$tab_ligne = array();
	reset ($TexteEclate);
	unset ($A);
	foreach ( $TexteEclate as $A ) {
		if (strpos($A,"\n") === false ) { 								// Cas particulier du retour chariot
			$expr .= ($CptrMots == 0 ) ? $A : " ".$A;					// premier mot de ligne = pas d'espace
			if (mb_strlen($expr,"UTF-8") > $cpl) { $finligne = 1; }		// ca dépasse ou pas?

			else {														// Non -> accumulation dans tampons
				$CptrMots++;
				$strlen_sauve = mb_strlen($expr,"UTF-8");
				$expr_sauve = $expr;
			}
		}
		else { 															// Oui -> le bac est plein
			$RetourChariot = 1;
			$finligne = 1; 
		}

		if ($finligne == 1) {											// Remplisage terminé -> sauvegarde et préparation ligne suivante
			$tab_ligne[$ptr]['nbrmot']	= $CptrMots;
			$tab_ligne[$ptr]['carspe']	= $RetourChariot;
			$tab_ligne[$ptr]['strlen']	= $strlen_sauve;
			$tab_ligne[$ptr]['expr']	= $expr_sauve;

			$expr = ($RetourChariot == 1) ? "" : $A;
			$CptrMots = ($RetourChariot == 1) ? 0 : 1 ;
			$finligne = $RetourChariot = 0;
			$ptr++;
		}
	}

	// Derniere ligne a faire
	$ptr++;
	$tab_ligne[$ptr]['nbrmot']	= $CptrMots;
	$tab_ligne[$ptr]['carspe']	= 0;
	$tab_ligne[$ptr]['strlen']	= $strlen_sauve;
	$tab_ligne[$ptr]['expr']	= $expr_sauve;

	if ( $debug == "P1" ) { 
		unset ($A);
		echo("\t|mots\t|\\n\t|len\t|expr\n");
		foreach ( $tab_ligne as $A ) {
			echo("\t|".$A['nbrmot']."\t|".$A['carspe']."\t|".$A['strlen']."\t|".$A['expr']."\n");
		}
	}


// -----------------------------------------------------
//	
//	
//	2eme phase de traitement
//	Formattage des lignes
//		Insertion d'espace entre les mot a interval régulier
//		Compensation en fin de ligne
//	
//	

	$rendu = "";
	if ( $debug == "Stat" ) { echo (str_repeat(" ",$cpl)."\t\t|Mots\t|Len\t|Coef\t|espace\t|comp\n"); }
	unset ($A);
	reset ($TexteEclate);
	$ptr = $diff = $CoefEspace = $compensation = 0;

	foreach ( $tab_ligne as $A ) {
		$CoefEspace = 0;
		if ( $A['strlen'] > floor($cpl*0.75) ) {	// Si pas assez long on ne justifie pas. Pa bo!
			$diff = $cpl - $A['strlen'];			// Forge du coef à accumuler
			$CoefEspace = ( $A['nbrmot'] != 1 ) ? round($diff/($A['nbrmot']-1), 4, PHP_ROUND_HALF_DOWN) : 0 ;
		}
		$expr = "";
		$EspaceCptr = 0; 

		for ( $i=1; $i<=$A['nbrmot']; $i++) {		// Commence la ligne
			if ( $EspaceCptr>=1 && $i>1) {
				$n = floor($EspaceCptr);
				if (($n + 1 + mb_strlen($expr.$TexteEclate[$ptr],"UTF-8"))>$cpl){ $n--; }
				$expr .= str_repeat(" ", $n);
				$EspaceCptr -= $n; 
			}
			$EspaceCptr += $CoefEspace;
			if ( $i==$A['nbrmot']){ 				// Compense pour le dernier mot. 
				$compensation = $cpl - (1 + mb_strlen($expr.$TexteEclate[$ptr],"UTF-8"));
				if ( $compensation>0 && $A['carspe'] == 0 ) {
					$expr .= str_repeat(" ", $compensation);
				}
			}
			$expr .= ($i == 1) ? "":" ";			// Espace naturel entre les mots.
			$expr .= $TexteEclate[$ptr];			// Mot
			$ptr++;
		}
		if ($A['carspe'] == 1) {					// Retour à la ligne
			$ptr++;
			$expr.= "\n";
		}
		if ( $debug == "Stat" ) { $rendu .= $expr."\t\t|".$A['nbrmot']."\t|".mb_strlen($expr, "UTF-8")."\t|".$CoefEspace."\t|".$EspaceCptr."\t|".$compensation."\n";}		// Debug crasseux pour controle.
		else {$rendu .= $expr."\n";}				// Accumulation du résultat

		$expr = "";
		$SessionCompteurMot += $A['nbrmot'];		// Comptage 
	}

	if ( isset($_REQUEST['depuisFormulaire'])){	}
	else {
		echo ($rendu);
		$_SESSION['consomation_mot'] += $SessionCompteurMot;
		session_write_close();
	}
}
?>
