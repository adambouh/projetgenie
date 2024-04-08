import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChefDepartementService } from './chef-departement.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chef-departement',
  templateUrl: './chef-departement.component.html',
  styleUrls: ['./chef-departement.component.css', 'assets/css/material-dashboard.min.css'],
})
export class ChefDepartementComponent {
  
  notifications: any[] = [];
  nombreNotificationsNonVues: number = 0;

  formulaire_update_demande_pc!: FormGroup;
  formulaire_update_demande_imprimante!: FormGroup;

  constructor(private chef_service: ChefDepartementService, private router: Router, private formbuilder: FormBuilder) { 
    this.formulaire_update_demande_pc = this.formbuilder.group({
      cpu: [''],
      ram: [''],
      disque: [''],
      ecran: ['']
    });

    this.formulaire_update_demande_imprimante = this.formbuilder.group({
      resolution: [''],
      vitesse: ['']
    });

  }

  ngOnInit(): void {
    this.loadNonSeenNotifications();
  }
  
  // Fonction pour vérifier si un lien est actif
  isLinkActive(link: string): boolean {
    return this.router.url.includes(link);
  }

  loadNonSeenNotifications() {
    const chefId = 1; // ID , vous pouvez le définir dynamiquement ou statiquement
    this.chef_service.getNonSeenNotifications(chefId).subscribe(
      (response: any[]) => {
        this.notifications = response;
        this.nombreNotificationsNonVues = this.notifications.length;
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }

  

  // Référence à l'élément pop-up dans le template HTML
  @ViewChild('popUpUpdateDemande_pc')
  popUpUpdateDemande_pc!: ElementRef;

  @ViewChild('popUpUpdateDemande_imprimante')
  popUpUpdateDemande_imprimante!: ElementRef;

  @ViewChild('demander_besoins')
  demander_besoins!: ElementRef;

  // Fonction pour masquer le pop-up
  removeUpdateDemandePopUp() {
    // Vérifier si l'élément existe
    if (this.popUpUpdateDemande_pc) {
      // Rendre l'élément invisible
      this.popUpUpdateDemande_pc.nativeElement.style.display = 'none';
    }

    // Vérifier si l'élément existe
    if (this.popUpUpdateDemande_imprimante) {
      // Rendre l'élément invisible
      this.popUpUpdateDemande_imprimante.nativeElement.style.display = 'none';
    }

    // Vérifier si l'élément existe
    if (this.demander_besoins) {
      // Rendre l'élément invisible
      this.demander_besoins.nativeElement.style.display = 'none';
    }
  }

  updateDemandePopUp(demande: any) {
   if(demande.type == "pc") {
    this.formulaire_update_demande_pc.patchValue({
      cpu: demande.cpu,
      ram: demande.ram,
      disque: demande.disque,
      ecran: demande.ecran === 1 ? 'Avec' : 'Sans'
    });
    console.log(demande.cpu);
    console.log(demande.ram);
    console.log(demande.disque);
    console.log(demande.ecran);
    
    this.popUpUpdateDemande_pc.nativeElement.style.display = 'flex';
   } else if(demande.type == "imprimante"){
    this.formulaire_update_demande_imprimante.patchValue({
      resolution: demande.resolution,
      vitesse: demande.vitesse,
    });
    
    this.popUpUpdateDemande_imprimante.nativeElement.style.display = 'flex';
   }
  }

  demanderBesoinPopUp() {
    // Vérifier si l'élément existe
    if (this.demander_besoins) {
      // Rendre l'élément invisible
      this.demander_besoins.nativeElement.style.display = 'flex';
    }
  }
}