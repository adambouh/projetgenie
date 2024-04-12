import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChefDepartementService } from '../chef-departement.service';
import { ChefDepartementComponent } from '../chef-departement.component';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../../home.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent extends ChefDepartementComponent implements OnInit {

  private tag = 'Demandes';
  protected demandesEnseignants: any[] = [];
  private allDemandes: any[] = [];
  private departementID = Number(localStorage.getItem("departementID"));
  protected formulaire_update_demande_pc!: FormGroup;
  protected formulaire_update_demande_imprimante!: FormGroup;
  private ressourceID!: any;
  protected selectedDemande: string = 'tous';
  protected filteredDemandes: any[] = [];

  constructor(
    private chefService: ChefDepartementService,
    protected override authService: AuthService,
    protected override router: Router,
    protected homeService: HomeService,
    private formbuilder: FormBuilder
  ) {
    super(authService, router, homeService);
    this.formulaire_update_demande_pc = this.formbuilder.group({
      cpu: [''],
      ram: [''],
      disque: [''],
      ecran: [''],
    });

    this.formulaire_update_demande_imprimante = this.formbuilder.group({
      resolution: [''],
      vitesse: [''],
    });
  }

  override ngOnInit(): void {
    this.setActiveClassToOffres(this.tag);
    this.loadDemandesEnseignants(this.departementID);
    this.changeDemandes();
  }

  // Get all the resources demanded by the enseignants departement 
  loadDemandesEnseignants(departementID: number) {
    this.chefService.getDemandesEnseignantsByDepartement(departementID).subscribe(
      (response: any[]) => {
        console.log("demandes des enseignants sont bien recuperés");

        this.demandesEnseignants = response;
        this.filteredDemandes = this.demandesEnseignants;
        this.allDemandes = this.demandesEnseignants;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }

  // Change the demandes
  changeDemandes() {
    if (this.selectedDemande == "tous") {
      this.demandesEnseignants = this.allDemandes;
    } else if (this.selectedDemande == "nouvelles") {
      this.demandesEnseignants = this.allDemandes.filter(allD => allD.etatDemande == "En_Cours_De_Traitement");
    } else if (this.selectedDemande == "anciennes") {
      this.demandesEnseignants = this.allDemandes.filter(allD => allD.etatDemande != "En_Cours_De_Traitement");
    }
    this.filteredDemandes = this.demandesEnseignants;
  }

  // Référence à l'élément pop-up dans le template HTML
  @ViewChild('popUpUpdateDemande_pc')
  popUpUpdateDemande_pc!: ElementRef;

  @ViewChild('popUpUpdateDemande_imprimante')
  popUpUpdateDemande_imprimante!: ElementRef;

  @ViewChild('sendDemandesToResponsableEl')
  sendDemandesToResponsableEl!: ElementRef;

  // Fonction pour masquer le pop-up
  removePopUp() {
    if (this.popUpUpdateDemande_pc) {
      this.popUpUpdateDemande_pc.nativeElement.style.display = 'none';
    }

    if (this.popUpUpdateDemande_imprimante) {
      this.popUpUpdateDemande_imprimante.nativeElement.style.display = 'none';
    }

    if (this.sendDemandesToResponsableEl) {
      this.sendDemandesToResponsableEl.nativeElement.style.display = 'none';
    }
  }

  sendDemandesToResponsable() {
    this.sendDemandesToResponsableEl.nativeElement.style.display = 'flex';
  }

  updateDemandePopUp(demande: any) {
    if (demande.etatDemande != "En_Cours_De_Traitement") {
      alert("Attention !\nCette demande a déjà été envoyée au responsable. Vous ne pouvez pas la modifier.")
    } else {
      this.ressourceID = demande.id;
      if (demande.typeRessource == "Ordinateur") {
        this.formulaire_update_demande_pc.patchValue({
          cpu: demande.cpu,
          ram: demande.ram,
          disque: demande.disqueDur,
          typeRessource: demande.typeRessource,
          ecran: demande.ecran == 1 ? 'Avec' : 'Sans'
        });

        this.popUpUpdateDemande_pc.nativeElement.style.display = 'flex';
      } else if (demande.typeRessource == "Imprimante") {
        this.formulaire_update_demande_imprimante.patchValue({
          resolution: demande.resolution,
          vitesse: demande.vitesseImpression
        });

        this.popUpUpdateDemande_imprimante.nativeElement.style.display = 'flex';
      }
    }

  }

  // Méthode pour supprimer un demande
  deleteDemande(demande: any): void {
    if (demande.etatDemande != "En_Cours_De_Traitement") {
      alert("Attention !\nCette demande a déjà été envoyée au responsable. Vous ne pouvez pas la supprimer.")

    } else {

      this.chefService.deletedemandeById(demande.id).subscribe(
        (response: any) => {
          console.log('demande supprimé avec succès.');
          this.allDemandes = this.allDemandes.filter(dem => dem.id !== demande.id);
          this.changeDemandes();
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la suppression du demande : ', error);
        }
      );
    }
  }

  // Update the demande selected
  updateCurrentDemande() {
    const index = this.demandesEnseignants.findIndex(demandeEn => demandeEn.id == this.ressourceID);

    if (this.demandesEnseignants[index].typeRessource == "Ordinateur") {
      const formulaireValues = this.formulaire_update_demande_pc.value;

      this.demandesEnseignants[index].cpu = formulaireValues.cpu;
      this.demandesEnseignants[index].disqueDur = formulaireValues.disque;
      this.demandesEnseignants[index].ram = formulaireValues.ram;
      formulaireValues.ecran == 'Avec' ? this.demandesEnseignants[index].ecran = 1 : this.demandesEnseignants[index].ecran = 0;

    } else if (this.demandesEnseignants[index].typeRessource) {
      const formulaireValues = this.formulaire_update_demande_imprimante.value;

      this.demandesEnseignants[index].resolution = formulaireValues.resolution;
      this.demandesEnseignants[index].vitesseImpression = formulaireValues.vitesse;
    }

    console.log(this.demandesEnseignants[index]);

    this.chefService.updateRessource(this.ressourceID, this.demandesEnseignants[index]).subscribe(
      (response: any[]) => {

        this.popUpUpdateDemande_pc.nativeElement.style.display = 'none';
        this.popUpUpdateDemande_imprimante.nativeElement.style.display = 'none';
      }, (error) => {
        console.log("error while updating demande");
        console.error(error);
      }
    );

  }

  sendDemandes() {
    this.chefService.changeDemandesStatus(this.departementID).subscribe(
      (response: any) => {
        this.allDemandes.forEach(demande => {
          if (demande.etatDemande === "En_Cours_De_Traitement") {
            demande.etatDemande = "Traité";
          }
        });
        this.changeDemandes();
        this.sendDemandesToResponsableEl.nativeElement.style.display = 'none';
        console.log("Demandes status changed succefully");

      }, (error) => {
        console.log("Error changing demandes status");
        console.error(error);
      }
    );

  }

  // Filtrage
  filterResults(text: string): void {
    if (!text) {
      // If search input is empty, display all users
      this.filteredDemandes = this.demandesEnseignants;
      return;
    }

    // Filter users based on the search query
    this.filteredDemandes = this.demandesEnseignants.filter(
      // || String(demande?.resolution).includes(text.toLowerCase()) || String(demande?.includes(text.toLowerCase()) || demande?.disqueDur?.includes(text.toLowerCase()));
      demande => demande?.user.first_name.toLowerCase().includes(text.toLowerCase()) || demande?.user.last_name.toLowerCase().includes(text.toLowerCase()) || demande?.typeRessource.toLowerCase().includes(text.toLowerCase()) || String(demande?.dateCreation).includes(text) || String(demande?.vitesseImpression).includes(text.toLowerCase()) || String(demande?.resolution).includes(text.toLowerCase()) || String(demande?.ram).includes(text.toLowerCase()) || String(demande?.cpu).includes(text.toLowerCase()) || String(demande?.disqueDur).includes(text.toLowerCase()));
  }
}
