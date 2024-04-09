import { Component } from '@angular/core';
import { ChefDepartementService } from '../chef-departement.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', './../assets/css/material-dashboard.min.css']
})
export class NotificationsComponent {
  notifications: any[] = [];

  constructor(private chef_service: ChefDepartementService) { }

  ngOnInit(): void {
    this.loadNotifications(1);
  }

  loadNotifications(id_recepteur: number) {
    this.chef_service.getNotifications(id_recepteur).subscribe(
      (response: any[]) => {
        this.notifications = response;
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }
}
