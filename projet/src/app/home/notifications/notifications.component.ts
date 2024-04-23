import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  private tag = "";
  protected notifications: any[] = [];
  protected filtredNotifications: any[] = [];
  protected selectedNotifications = "non-lu";

  constructor(private homeComponent: HomeComponent) { }

  ngOnInit(): void {
    this.homeComponent.setActiveClassToOffres(this.tag);
    this.notifications = this.homeComponent.getNotifications();
    this.filtredNotifications = this.notifications;
    this.changeNotifications();
  }

  changeNotifications() {
    if (this.selectedNotifications == "all") {
      this.filtredNotifications = this.notifications;
    } else if (this.selectedNotifications == "lu") {
      this.filtredNotifications = this.notifications.filter(not => not.etat_lu == true);
    } else if (this.selectedNotifications == "non-lu") {
      this.filtredNotifications = this.notifications.filter(not => not.etat_lu == false);
    }
  }

  changeAllNotificationsStatus() {
    if (confirm("Voulez vous vraiment rendre tous les notifications lues?")) {
      const notificationsNonSeen = this.notifications.filter(not => not.etat_lu == false);
      const notificationsNonSeenIDs = notificationsNonSeen.map(not => not.id);
      this.homeComponent.changeNotificationsStatus(notificationsNonSeenIDs).subscribe(
        (response: any[]) => {

          alert("Les notifications sont marquées comme lues");
          this.notifications.forEach(n => {
            if (n.etat_lu == false) {
              n.etat_lu = true;
            }
          });
          this.filtredNotifications = this.notifications;
          this.changeNotifications();

        },
        (error) => {
          console.error('Une erreur s\'est produite lors de changement d\'etat des notifications: ', error);
        }
      );
    }
  }

  changeNotificationStatus(notification: any) {
    if (notification.etat_lu == true) {
      alert("La notification est déjà marquée comme lue");
    } else {

      const notificationsNonSeenIDs: any[] = [];
      notificationsNonSeenIDs.push(notification.id);
      this.homeComponent.changeNotificationsStatus(notificationsNonSeenIDs).subscribe(
        (response: any[]) => {

          alert("La notification est marquée comme lue");
          this.notifications.forEach(n => {
            if (n.id == notification.id) {
              n.etat_lu = true;
            }
          });
          this.filtredNotifications = this.notifications;
          this.changeNotifications();

        },
        (error) => {
          console.error('Une erreur s\'est produite lors de changement d\'etat des notifications: ', error);
        }
      );

    }
  }

  // Filter for needs
  filterUserNotifications(text: string): void {
    this.changeNotifications();
    if (!text) {
      // If search input is empty, display all ressources
      this.filtredNotifications = this.filtredNotifications;
      return;
    }

    this.filtredNotifications = this.filtredNotifications.filter(
      not => String(not?.date_envoi).includes(text) || String(not?.etat_lu).toLowerCase().includes(text.toLowerCase()) || not?.contenu.toLowerCase().includes(text.toLowerCase()) || not?.emetteur?.first_name?.includes(text.toLowerCase()) || not?.emetteur?.last_name?.includes(text.toLowerCase())
    );
  }
}
