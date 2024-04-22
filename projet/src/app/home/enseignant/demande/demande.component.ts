import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EnseignantComponent } from '../enseignant.component';
import { EnseignantService } from '../enseignant.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../../home.service';
import { UsersService } from 'src/app/users';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent extends EnseignantComponent implements OnInit {

  private tag = "Demandes";
  protected formulaire_ajout_ordinateur!: FormGroup;
  protected formulaire_ajout_imprimante!: FormGroup;
  protected selectedNeed: string = 'all';
  needs: any[] = [];
  filtredNeeds: any[] = [];
  private enseignantID: any;
  protected formulaire_update_demande_ordinateur!: FormGroup;
  protected formulaire_update_demande_imprimante!: FormGroup;
  private needID!: any;

  constructor(
    private enseignantService: EnseignantService,
    protected override authService: AuthService,
    protected override router: Router,
    protected homeService: HomeService,
    protected userService: UsersService,
    private formbuilder: FormBuilder
  ) {
    super(authService, router, homeService);
    this.formulaire_ajout_ordinateur = this.formbuilder.group({
      cpu: [''],
      ram: [''],
      disque: [''],
      ecran: [''],
    });

    this.formulaire_ajout_imprimante = this.formbuilder.group({
      resolution: [''],
      vitesse: [''],
    });
    this.formulaire_update_demande_ordinateur = this.formbuilder.group({
      cpu: [''],
      ram: [''],
      disque: [''],
      ecran_update: [''],
    });

    this.formulaire_update_demande_imprimante = this.formbuilder.group({
      resolution: [''],
      vitesse: [''],
    });
  }

  override ngOnInit(): void {
    this.setActiveClassToOffres(this.tag);
    this.enseignantID = localStorage.getItem("id");
    this.loadNeeds();
    this.changeNeeds();
  }

  // List of enseignant needs
  loadNeeds() {

    this.enseignantService.getRessourcesByDemander(this.enseignantID).subscribe(
      (response: any[]) => {
        this.needs = response;
        this.filtredNeeds = this.needs;
      },
      (error: any) => {
        console.error('Erreur lors de récuperation des besoins crées par l\'enseignant : ', error);
      }
    );
  }

  // Référence à l'élément pop-up dans le template HTML
  @ViewChild('popUpUpdateDemande_ordinateur')
  popUpUpdateDemande_ordinateur!: ElementRef;

  @ViewChild('popUpUpdateDemande_imprimante')
  popUpUpdateDemande_imprimante!: ElementRef;

  @ViewChild('popUp_ordinateur')
  popUp_ordinateur!: ElementRef;

  @ViewChild('popUpUp_imprimante')
  popUpUp_imprimante!: ElementRef;

  popUpOrdinateur() {
    this.popUp_ordinateur.nativeElement.style.display = "flex";
  }
  popUpImprimante() {
    this.popUpUp_imprimante.nativeElement.style.display = "flex";
  }

  removePopUpOrdinateur() {
    this.popUp_ordinateur.nativeElement.style.display = "none";
  }
  removePopUpImprimante() {
    this.popUpUp_imprimante.nativeElement.style.display = "none";
  }
  removeUpdateNeedPopUp() {
    if (this.popUpUpdateDemande_ordinateur) {
      this.popUpUpdateDemande_ordinateur.nativeElement.style.display = 'none';
    }

    if (this.popUpUpdateDemande_imprimante) {
      this.popUpUpdateDemande_imprimante.nativeElement.style.display = 'none';
    }
  }

  updateNeedPopUp(need: any) {
    if (need.etatDemande != "créée") {
      alert("Attention !\nCette besoin a déjà été envoyée au chef du departement. Vous ne pouvez pas le modifier.")
    } else {
      this.needID = need.id;
      if (need.typeRessource == "Ordinateur") {
        this.formulaire_update_demande_ordinateur.patchValue({
          cpu: need.cpu,
          ram: need.ram,
          disque: need.disqueDur,
          typeRessource: need.typeRessource,
          ecran_update: need.ecran == 1 ? 'Avec' : 'Sans'
        });

        this.popUpUpdateDemande_ordinateur.nativeElement.style.display = 'flex';
      } else if (need.typeRessource == "Imprimante") {
        this.formulaire_update_demande_imprimante.patchValue({
          resolution: need.resolution,
          vitesse: need.vitesseImpression
        });

        this.popUpUpdateDemande_imprimante.nativeElement.style.display = 'flex';
      }
    }

  }

  updateCurrentNeed() {
    const index = this.needs.findIndex(need => need.id == this.needID);

    if (this.needs[index].typeRessource == "Ordinateur") {
      const formulaireValues = this.formulaire_update_demande_ordinateur.value;

      this.needs[index].cpu = formulaireValues.cpu;
      this.needs[index].disqueDur = formulaireValues.disque;
      this.needs[index].ram = formulaireValues.ram;
      formulaireValues.ecran_update == 'Avec' ? this.needs[index].ecran = 1 : this.needs[index].ecran = 0;

    } else if (this.needs[index].typeRessource) {
      const formulaireValues = this.formulaire_update_demande_imprimante.value;

      this.needs[index].resolution = formulaireValues.resolution;
      this.needs[index].vitesseImpression = formulaireValues.vitesse;
    }


    this.enseignantService.updateNeed(this.needID, this.needs[index]).subscribe(
      (response: any[]) => {
        alert("Le besoin a été modifié avec succès !!");
      }, (error) => {
        console.log("error while updating need");
        console.error(error);
      }
    );
    this.popUpUpdateDemande_ordinateur.nativeElement.style.display = 'none';
    this.popUpUpdateDemande_imprimante.nativeElement.style.display = 'none';
  }

  sendNeedsToChef() {

    // Filtrer les objets selon etatDemande == "créée"
    const createdNeeds = this.needs.filter(need => need.etatDemande === "créée");

    // Créer une liste contenant juste les IDs des objets filtrés
    const needsIds = createdNeeds.map(need => need.id);

    if (confirm("Les besoins que vous avez crées seront envoyer au chef du departement, confirmez-vous?")) {
      this.enseignantService.changeNeedsStatus(needsIds).subscribe(
        (response: any[]) => {
          this.needs.forEach(need => {
            if (need.etatDemande === "créée") {
              need.etatDemande = "En_Cours_De_Traitement";
            }
          });
          this.changeNeeds();
          alert("Les besoin ont été envoyée avec succès !!");
        }, (error) => {
          console.log("Les besoin n'ont pas été envoyée");
          console.error(error);
        }
      );

    }
  }

  // Méthode pour supprimer un demande
  deleteNeed(need: any): void {
    if (need.etatDemande != "créée") {
      alert("Attention !\nCette besoin a déjà été envoyée au chef. Vous ne pouvez pas le supprimer.")

    } else {

      if (confirm("Voulez vous vraiment supprimer cette besoin ?")) {
        this.enseignantService.deleteNeedById(need.id).subscribe(
          (response: any) => {
            this.needs = this.needs.filter(dem => dem.id !== need.id);
            this.changeNeeds();
            alert("Le besoin a été supprimée avec succès !!");
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la suppression du besoin : ', error);
          }
        );
      }
    }
  }

  // Changing needs depend on the selected option
  changeNeeds() {
    if (this.selectedNeed == "all") {
      this.filtredNeeds = this.needs;
    } else if (this.selectedNeed == "created") {
      this.filtredNeeds = this.needs.filter(need => need.etatDemande == 'créée');
    } else if (this.selectedNeed == "sent") {
      this.filtredNeeds = this.needs.filter(need => need.etatDemande != 'créée');
    }
  }

  addOrdinateur() {
    // Récupérer les valeurs du formulaire
    const formData = this.formulaire_ajout_ordinateur.value;
    const ecranValue = formData.ecran === 'Avec' ? 1 : 0;

    const Ordinateur = {
      cpu: formData.cpu,
      ram: formData.ram,
      disqueDur: formData.disque,
      ecran: ecranValue,
      typeRessource: "Ordinateur",
      userId: this.enseignantID
    };

    this.enseignantService.addNeed(Ordinateur).subscribe(
      (response: any) => {
        alert("Le besoin a été ajouté avec succès !!");
        this.needs.unshift(response);
        this.changeNeeds();
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'ajout  du besoin : ', error);
      }
    );
    this.removePopUpOrdinateur();
  }
  addImprimante() {
    // Récupérer les valeurs du formulaire
    const formData = this.formulaire_ajout_imprimante.value;

    const Imprimante = {
      resolution: formData.resolution,
      vitesseImpression: formData.vitesse,
      typeRessource: "Imprimante",
      userId: this.enseignantID
    };

    this.enseignantService.addNeed(Imprimante).subscribe(
      (response: any) => {
        alert("Le besoin a été ajouté avec succès !!");
        this.needs.unshift(response);
        this.changeNeeds();
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'ajout  du besoin : ', error);
      }
    );
    this.removePopUpImprimante();
  }

  // Filter for needs
  filterResultsNeeds(text: string): void {
    this.changeNeeds();
    if (!text) {
      // If search input is empty, display all ressources
      this.filtredNeeds = this.filtredNeeds;
      return;
    }

    this.filtredNeeds = this.filtredNeeds.filter(
      need => String(need?.dateCreation).includes(text) || need?.etatDemande.toLowerCase().includes(text.toLowerCase()) || need?.typeRessource.toLowerCase().includes(text.toLowerCase()) || String(need?.vitesseImpression).includes(text.toLowerCase()) || String(need?.resolution).includes(text.toLowerCase()) || String(need?.ram).includes(text.toLowerCase()) || String(need?.cpu).includes(text.toLowerCase()) || String(need?.disqueDur).includes(text.toLowerCase())
    );
  }
}
