import { Component, OnInit } from '@angular/core';
import { responsabledesresources } from '../responsable-des-resources.component';
import { UsersService } from 'src/app/users';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelsComponent extends responsabledesresources implements OnInit {
  private tag = 'Personels';
  filteredusersList: any[] = [];
  usersList: any[] = [];

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

    // Fetch users data and fill the filtered users list
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.usersList = data;
        this.filteredusersList = data; // Initialize filtered users list with all users
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  filterResults(text: string): void {
    if (!text) {
      // If search input is empty, display all users
      this.filteredusersList = this.usersList;
      return;
    }

    // Filter users based on the search query
    this.filteredusersList = this.usersList.filter(
      user => user?.first_name.toLowerCase().includes(text.toLowerCase()) || user?.last_name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
