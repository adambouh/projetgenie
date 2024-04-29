
// This function allows us to change between the new and finished appels d'offres
function changeVisibleAppels(choice) {

    // At first we remove active-choice from the three choices
    const newChoices = document.querySelector('.new-choice');
    if (newChoices) {
        newChoices.classList.remove('active-choice');
    }
    const endedChoices = document.querySelector('.ended-choice');
    if (endedChoices) {
        endedChoices.classList.remove('active-choice');
    }
    const allChoices = document.querySelector('.all-choice');
    if (allChoices) {
        allChoices.classList.remove('active-choice');
    }

    // We add active-choice class to the selected choice element
    const choiceSelected = document.querySelector('.' + choice);
    if (choiceSelected) {
        choiceSelected.classList.add('active-choice');
    }

    // We than hide all the appels d'offres
    const allAppels = document.querySelectorAll('.all');
    if (allAppels) {
        allAppels.forEach((element) => {
            if (element) {
                element.style.display = "none";
            }
        });
    }

    // Than we show only the appels d'offres concerned by the choice
    if (choice == "all-choice") {

      const appels = document.querySelectorAll('.all');
      if (appels) {
        appels.forEach((element) => {
          if (element) {
            element.style.display = "block";
          }
        });
      }

    } else if ( choice == "new-choice" ) {

      const appels = document.querySelectorAll('.new');
      if (appels) {
        appels.forEach((element) => {
          if (element) {
            element.style.display = "block";
          }
        });
      }

    } else if ( choice == "ended-choice" ) {

      const appels = document.querySelectorAll('.ended');
      if (appels) {
        appels.forEach((element) => {
          if (element) {
            element.style.display = "block";
          }
        });
      }

    }
}

// Calling the function
changeVisibleAppels('new-choice');

// Controle input to accepts numbers only
function controleInput(input) {

  var valeur = input.value;
  var valeurModifiee = valeur.replace(/[^0-9.]/g, '');

  if (valeur !== valeurModifiee) {
      input.value = valeurModifiee;
  }
}

// To calculate the total amount of all propositions in an appel d'offre
function calculerTotal() {

  var champsPrix = document.querySelectorAll('.prix');
  var montantTotal = 0;
  
  champsPrix.forEach(function(champ) {
      var valeur = parseFloat(champ.value);

      if (!isNaN(valeur)) {
          montantTotal += valeur;
      }

  });
  
  document.getElementById("prix-total").value = montantTotal.toFixed(2);
}

// Ce code next, to desactivate dates before current day
var dateInput = document.getElementById('dateInput');
var aujourdHui = new Date();
var aujourdHuiFormat = aujourdHui.getFullYear() + '-' + ('0' + (aujourdHui.getMonth() + 1)).slice(-2) + '-' + ('0' + aujourdHui.getDate()).slice(-2);
dateInput.min = aujourdHuiFormat;

// To display an appel detail
function showAppelDetails(id) {

  var windowDetails = document.getElementById(id);
  if (windowDetails) {
    windowDetails.style.display = "flex";
  }
}

// hide all the appel details
function cancelSVG(){

  const ressourceDetails = document.querySelectorAll('.window-detail');
  if (ressourceDetails) {
    ressourceDetails.forEach((element) => {
          if (element) {
              element.style.display = "none";
          }
      });
  }
}