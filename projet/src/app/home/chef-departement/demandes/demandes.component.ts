import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChefDepartementService } from '../chef-departement.service';
import { ChefDepartementComponent } from '../chef-departement.component';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css', './../assets/css/material-dashboard.min.css']
})
export class DemandesComponent {

  demandesEnseignants: any[] = [];

  constructor(private chef_service: ChefDepartementService, private chef_dep: ChefDepartementComponent) { }

  ngOnInit(): void {
    this.loadDemandesEnseignants();
  }

  loadDemandesEnseignants() {
    const departementId = 1; // ID du département, vous pouvez le définir dynamiquement ou statiquement
    this.chef_service.getDemandesEnseignantsByDepartement(departementId).subscribe(
      (response: any[]) => {
        this.demandesEnseignants = response;
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }

  // Méthode pour supprimer un besoin
  deleteBesoin(besoinId: number): void {
    this.chef_service.deleteBesoinById(besoinId).subscribe(
      () => {
        console.log('Besoin supprimé avec succès.');
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression du besoin : ', error);
      }
    );
  }
  updateDemandePopUp(demande: any) {    
    this.chef_dep.updateDemandePopUp(demande);
  }
}
