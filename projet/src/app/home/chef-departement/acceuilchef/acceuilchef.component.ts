import { Component } from '@angular/core';
import { ChefDepartementService } from '../chef-departement.service';
import { ChefDepartementComponent } from '../chef-departement.component';

@Component({
  selector: 'app-acceuilchef',
  templateUrl: './acceuilchef.component.html',
  styleUrls: ['./acceuilchef.component.css', './../assets/css/material-dashboard.min.css']
})
export class AcceuilchefComponent {

  enseignants: any[] = [];

  constructor(private chef_service: ChefDepartementService, private ched_dep: ChefDepartementComponent) { }

  ngOnInit(): void {
    this.loadEnseignants(1);
  }

  loadEnseignants(departementId: number) {
    this.chef_service.getEnseignants(departementId).subscribe(
      (response: any[]) => {
        this.enseignants = response;

      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }

  demanderbesoin() {
    this.ched_dep.demanderBesoinPopUp();
  }
}
