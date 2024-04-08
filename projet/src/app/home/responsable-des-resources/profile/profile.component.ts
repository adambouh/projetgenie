import { Component, OnInit } from '@angular/core';
import { responsabledesresources } from '../responsable-des-resources.component';
import { UsersService } from 'src/app/users';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../../home.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends responsabledesresources implements OnInit {
  private tag = 'Profile';
  public user: any = {}; 
  private username = localStorage.getItem("login");

  constructor(
    private userService: UsersService,
    protected override authService: AuthService,
    protected override router: Router,
    protected homeService: HomeService
  ) {
    super(authService, router, homeService);
  }

  override ngOnInit(): void {
    // Call the method to set "active" class to the list item with "Offres" link
    this.setActiveClassToOffres(this.tag);
    if (this.username) {
      this.userService.getUserByLogin(this.username).subscribe(
        (data: any[]) => {
          this.user = data;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    }
  }

  saveProfile(): void { 
    this.userService.UpdateUser(this.user.id,this.user); }

    updatepassword(pass: any): void {
      const passwordPayload = { password: pass };
    
      // Call the UpdatePassword method and subscribe to the Observable
      this.userService.UpdatePassword(this.user.id, passwordPayload).subscribe(
        () => {
          // Password update successful
          console.log("Password updated successfully");
    
          // Navigate to the home page or perform any other necessary actions
          this.router.navigateByUrl("/home");
        },
        (error) => {
          // Log the server-side error message
          console.error("Server-side error:", error);
    
          // Handle the error appropriately based on your application's requirements
        }
      );
    }
    
    
    
    

    
  
}
