import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  private tag="";
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
      this.filtredNotifications = this.notifications.filter(not => not.etatDemande == true);
    } else if (this.selectedNotifications == "non-lu") {
      this.filtredNotifications = this.notifications.filter(not => not.etatDemande != false);
    }
  }

  changeAllNotificationsStatus() {
    if (confirm("Voulez vous vraiment rendre tous les notifications lues?")) {
      const notificationsNonSeen = this.notifications.filter(not => not.etat_lu == false);
      const notificationsNonSeenIDs = notificationsNonSeen.map(not => not.id);
      alert(notificationsNonSeenIDs);
    }
  }

  changeNotificationStatus(notification: any) {
    const notificationsNonSeenIDs: any[] = [];
    notificationsNonSeenIDs.push(notification.id);
    alert(notificationsNonSeenIDs);
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
