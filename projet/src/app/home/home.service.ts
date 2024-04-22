import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  static role(){
    const role = localStorage.getItem("role");
    return role
  }

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}
  logout() { 
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  // Méthode pour récupérer les notification d'un utilisateur par l'ID
  getNotifications(id_user: number): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/notification/getNotificationByUser?user_id="+id_user);
  }
}
