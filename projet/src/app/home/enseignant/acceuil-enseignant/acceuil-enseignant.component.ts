import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EnseignantComponent } from '../enseignant.component';
import { UsersService } from 'src/app/users';
import { HomeService } from '../../home.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { EnseignantService } from '../enseignant.service';

@Component({
  selector: 'app-acceuil-enseignant',
  templateUrl: './acceuil-enseignant.component.html',
  styleUrls: ['./acceuil-enseignant.component.css']
})
export class AcceuilEnseignantComponent extends EnseignantComponent implements OnInit {

  private tag = "Acceuil";
  private enseignantID: any;
  ressources: any[] = [];
  filtredRessouces: any[] = [];
  private resourceID: any;
  protected selectedPannes: string = 'NonRepare';
  pannes: any[] = [];
  filtredPannes: any[] = [];

  constructor(
    private enseignantService: EnseignantService,
    protected override authService: AuthService,
    protected override router: Router,
    protected homeService: HomeService,
    protected userService: UsersService
  ) {
    super(authService, router, homeService);
  }

  override ngOnInit(): void {
    this.setActiveClassToOffres(this.tag);
    this.enseignantID = localStorage.getItem("id");
    this.loadRessources();
    this.loadPannes();
    this.changePannes();
  }

  // List of enseignant ressource
  loadRessources() {

    this.enseignantService.getRessourcesByEnseignant(this.enseignantID).subscribe(
      (response: any[]) => {
        this.ressources = response;
        this.filtredRessouces = this.ressources;
      },
      (error: any) => {
        console.error('Erreur lors de récuperation des ressources affectées à l\'enseignant : ', error);
      }
    );
  }

  // List of pannes
  loadPannes() {
    this.enseignantService.getPannesByEnseignant(this.enseignantID).subscribe(
      (response: any[]) => {
        this.pannes = response;
        this.filtredPannes = this.pannes;
        console.log("les panens : ");
        console.log(this.filtredPannes);
        
        
      },
      (error: any) => {
        console.error('Erreur lors de récuperation des pannes : ', error);
      }
    );
  }

  @ViewChild('popUpPanne')
  popUpPanne!: ElementRef;

  // Show the pop up panne
  pannePopUp(resourceID: number) {
    this.resourceID = resourceID;
    this.popUpPanne.nativeElement.style.display = "flex";
  }

  removePannePopUp() {
    this.popUpPanne.nativeElement.style.display = "none";
  }

  signalerPanne() {

    this.enseignantService.signalPanne(this.resourceID).subscribe(
      (response: any) => {
        alert("Panne est signalée!!")
      },
      (error: any) => {
        console.error('Erreur lors signalisation de la panne de ressource : ', error);
      });
    this.popUpPanne.nativeElement.style.display = "none";

  }

  changePannes() {
    if (this.selectedPannes == "all") {
      this.filtredPannes = this.pannes;

    } else if (this.selectedPannes == "NonRepare") {
      this.filtredPannes = this.pannes.filter(p => p.etatPanne == 'NonRepare');
    
    } else if (this.selectedPannes == "Repare") {
      this.filtredPannes = this.pannes.filter(p => p.etatPanne == 'Repare');
    
    } else if (this.selectedPannes == "EnCours") {
      this.filtredPannes = this.pannes.filter(p => p.etatPanne == 'EnCours');

    } else if (this.selectedPannes == "Severe") {
      this.filtredPannes = this.pannes.filter(p => p.etatPanne == 'Severe');
    }

  }

  // Filter for resources
  filterResultsRessources(text: string): void {
    if (!text) {
      // If search input is empty, display all ressources
      this.filtredRessouces = this.ressources;
      return;
    }

    this.filtredRessouces = this.ressources.filter(
      ressource => String(ressource?.codeInventaire).toLowerCase().includes(text.toLowerCase()) || ressource?.typeRessource.toLowerCase().includes(text.toLowerCase()) || String(ressource?.vitesseImpression).includes(text.toLowerCase()) || String(ressource?.resolution).includes(text.toLowerCase()) || String(ressource?.ram).includes(text.toLowerCase()) || String(ressource?.cpu).includes(text.toLowerCase()) || String(ressource?.disqueDur).includes(text.toLowerCase())
    );
  }

  // Filter for Pannes
  filterResultsPannes(text: string): void {    
    
    if (!text) {
      // If search input is empty, display all ressources
      this.filtredPannes = this.pannes;
      return;
    }

    this.filtredPannes = this.pannes.filter(
      panne => String(panne?.ressource.codeInventaire).toLowerCase().includes(text.toLowerCase()) || panne?.ressource.typeRessource.toLowerCase().includes(text.toLowerCase()) || panne?.etatPanne.toLowerCase().includes(text.toLowerCase())  || String(panne?.dateSignal).includes(text)
    );
  }
}


