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

ini_set ("display_errors", 1 );
error_reporting(E_ALL);
ini_set('session.use_strict_mode', 1);

session_start();

echo ("<html>
<head>
<title>Petites demos / Justify-4E71-NOP</title>
<charset='utf-8'>
<link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous'>
</head>
<body>
<h1>Petites demos: 'Justifier Monospace'</h1>
");

if ( isset($_REQUEST['post'])) {
	if ( !isset($_REQUEST['cpl'])) {$cpl=80;}
	else { $cpl = &$_REQUEST['cpl']; }
	//echo ("<span class='btn btn-success'>Formulaire posté</span>");
	$_REQUEST['depuisFormulaire'] = 1;
	include ("api/justify.php");
}
else{
	$cpl= 80;
	$SessionCompteurMot = 0;
	$_REQUEST['texte'] = "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint.
Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé.Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour. 
Loreméé ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit orci at sagittis ultrices. Mauris commodo blandit elit, eget rutrum lacus. Sed ultricies leo tincidunt mauris accumsan, sit amet pellentesque dui vulputate. Aliquam mollis diam id facilisis varius. Curabitur eget pretium velit. Sed in tempor ex. Integer blandit elit vitae lacinia tempus. Nullam dapibus, ligula ut imperdiet efficitur, mauris lacus rutrum arcu, sed egestas erat leo in nulla. Quisque tincidunt ex nunc, quis malesuada dolor pretium sed. Suspendisse convallis feugiat congue. Pellentesque dapibus magna elementum, semper nisl nec, blandit odio. Pellentesque odio lectus, sagittis sed laoreet quis, egestas eu dui. Mauris elementum quis metus vel ornare. Curabitur egestas id sem porta volutpat.
Etiam iaculis felis in arcu porta eleifend. Donec sit amet odio nulla. Nulla aliquet tincidunt turpis, sit amet volutpat nisl sodales in. Ut consectetur nec nulla nec dictum. Pellentesque volutpat egestas est. Cras tincidunt ex interdum, pellentesque mauris quis, tincidunt erat. Sed ullamcorper turpis a consequat dictum. Duis laoreet ultrices eros, sed blandit nibh fringilla et. Aenean interdum sapien eu congue scelerisque. Sed sodales lorem sed sodales hendrerit. Nullam quis tortor vitae ex placerat semper a tristique orci. Nulla elit nulla, vestibulum id consequat in, suscipit non lorem. Suspendisse id quam ac libero facilisis facilisis in quis lorem. Suspendisse fermentum, magna et dictum malesuada, lacus leo lacinia sapien, non dictum arcu orci vitae lectus. Ut auctor dictum metus nec mollis. Curabitur bibendum rutrum lectus eget interdum. 
In et mollis erat, at lacinia dui. Fusce non dapibus diam. Pellentesque in eleifend turpis, vitae congue ligula. Cras placerat interdum eleifend. Aliquam tellus odio, rhoncus et suscipit ut, mattis feugiat eros. Maecenas egestas sodales mauris ut tincidunt. Sed mauris nunc, tempus vitae iaculis vitae, dapibus vel est.
In pulvinar ipsum eu tellus fringilla pretium. Duis ornare blandit lectus, id aliquam eros lacinia sed. Suspendisse nec molestie nunc, et sodales purus. Sed bibendum eros vel leo bibendum, vitae pharetra eros tempus. Proin convallis massa eget convallis molestie. Proin tempus ac diam in fringilla. Suspendisse rhoncus semper augue, non sagittis mi porta et. Aenean eu aliquet eros, at dignissim sapien. Quisque suscipit molestie rutrum. Donec in lectus ac metus hendrerit ultricies. Sed a ipsum nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Curabitur volutpat eleifend nunc id volutpat. Fusce a libero ligula. Curabitur in nunc ac lacus ultricies volutpat sed non nunc. Integer eu magna in velit tincidunt aliquet eget ac velit. Nam rutrum arcu id odio semper, quis egestas velit vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque tempor mattis est, vel commodo sapien blandit quis. Proin malesuada quam venenatis nulla eleifend pretium. Aenean quis ex semper, interdum nunc eget, condimentum est. Proin venenatis quis mauris et accumsan. Donec placerat neque sit amet sodales imperdiet. Etiam diam libero, vestibulum vitae suscipit ultrices, vestibulum nec justo. Phasellus congue mi convallis scelerisque semper.";
}

echo ("
<div style='width:85%; margin:0 auto 0 auto;'>
<form method='post' name='api-justify' action='justify_test.php'>

Texte à formatter:<br>
<textarea name='texte' cols='50' rows='5' >".$_REQUEST['texte']."</textarea><br>

<br>
Nombre de caractères par ligne souhaité: <input type='text' name='cpl' placeholder='Entrez une valeur' value='".$cpl."' size='5'>

<input type='hidden' name='post' value='1'>
<input class='btn btn-info' type='submit' value='Formatter'>
</form>
</div>
");

if ( isset($forbidden402)) { $rendu = "402 Payment Required"; }
if ( isset($_REQUEST['post'])) {
	$_SESSION['consomation_mot'] += $SessionCompteurMot;
	echo ( "<div style='width:85%; margin:0 auto 0 auto; border: 1px solid #000000'>
	Vous avez consomé ".$_SESSION['consomation_mot']." mots.<br>\r<br>\r
	<pre style=\"font-family:'Monospace'; font-size:0.75em;\">\n".$rendu."</pre>
	</div>
	");
}

//$_SESSION['consomation_mot'] =0;
echo ( "<!--".session_id()."-->" );

echo ("
</body>
</html>
");

session_write_close();
?>
