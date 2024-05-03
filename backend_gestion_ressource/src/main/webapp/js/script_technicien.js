
function changePanneStatus(idPanne) {
		
	document.getElementById("idPanne").value = idPanne;
	
	// recuprer le type de ressource et le code inventaire de ressource concerné par le panne 
	let typeRessource = document.getElementById("typeRessource_"+idPanne).value;
	let codeInventaire = document.getElementById("codeInventaire_"+idPanne).value;
	
	// ajouter ces valeur au pop up
	var elementsTypeRessource = document.getElementsByClassName("typeRessourceInput");
	for (var i = 0; i < elementsTypeRessource.length; i++) {
	    elementsTypeRessource[i].value = typeRessource;
	}
	
	var elementsCodeInventaire = document.getElementsByClassName("codeInventaireInput");
	for (var j = 0; j < elementsCodeInventaire.length; j++) {
	    elementsCodeInventaire[j].value = codeInventaire;
	}
	
	// afficher le pop up
	document.getElementById("popUp_panne").style.display = "flex";
	
	// si le ressource est un imprimante alors l'ordre de panne est automatiquement materiel
	if (typeRessource == "Imprimante") {
		document.getElementById("ordrePanne").style.display = "none";
	}
}

function hideChangePanneStatus() {
	document.getElementById("popUp_panne").style.display = "none";
	document.getElementById("ordrePanne").style.display = "grid";
}

function showConstatElements() {
	var dateApparition = document.getElementById("dateApparition");
    var explication = document.getElementById("explication");
    
    // Ajouter l'attribut "required"
    dateApparition.required = true;
    explication.required = true;
    
	let constat = document.getElementById("constat");
    this.constat.style.display = "flex";
}

function hideConstatElements() {
	var dateApparition = document.getElementById("dateApparition");
    var explication = document.getElementById("explication");
    
    // Supprimer l'attribut "required"
    dateApparition.required = false;
    explication.required = false;
    
	let constat = document.getElementById("constat");
	this.constat.style.display = "none";
	hideDefautPanne();
}

function showDefautPanne() {
	let defautPanne = document.getElementById("defautPanne"); 
  	this.defautPanne.style.display = "grid";
}

function hideDefautPanne() {
	let defautPanne = document.getElementById("defautPanne"); 
  	this.defautPanne.style.display = "none";
}

 // hiding any message error
function hideMessageError() {
  const ressourceDetails = document.querySelectorAll('.message-erreur-container');
  if (ressourceDetails) {
    ressourceDetails.forEach((element) => {
          if (element) {
              element.style.display = "none";
          }
      });
  }
}

// hiding any succes message
function hideMessageSucces() {
  const ressourceDetails = document.querySelectorAll('.message-succes-container');
  if (ressourceDetails) {
    ressourceDetails.forEach((element) => {
          if (element) {
              element.style.display = "none";
          }
      });
  }
}