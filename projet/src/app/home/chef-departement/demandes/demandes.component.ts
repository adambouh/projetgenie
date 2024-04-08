import { Component } from '@angular/core';
import { ChefDepartementService } from '../chef-departement.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css', './../assets/css/material-dashboard.min.css']
})
export class DemandesComponent {
  demandesEnseignants: any[] = [];

  constructor(private chef_service: ChefDepartementService) { }

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
}
