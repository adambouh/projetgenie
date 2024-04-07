import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  static role(){
    const role = localStorage.getItem("role");
    return role
  }



  constructor(private authService: AuthService, private router: Router) {}
  logout() { 
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
