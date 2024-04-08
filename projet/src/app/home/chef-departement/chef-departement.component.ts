import { Component } from '@angular/core';
import { ChefDepartementService } from './chef-departement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chef-departement',
  templateUrl: './chef-departement.component.html',
  styleUrls: ['./chef-departement.component.css', 'assets/css/material-dashboard.min.css'],
})
export class ChefDepartementComponent {
  notifications: any[] = [];
  nombreNotificationsNonVues: number = 0;

  constructor(private chef_service: ChefDepartementService, private router: Router) { }

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
}