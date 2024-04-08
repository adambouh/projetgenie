import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit  {
  constructor(protected authService: AuthService, protected router: Router,protected HomeService: HomeService) {}
  ngOnInit(): void {
    if(HomeService.role() === "ChefDepartement") {
      this.router.navigate(['/home/respo']); // Navigate to the 'chef-departement' route
    }
  }
  

    logout() { 
      this.authService.logout();
      this.router.navigate(['/login']); // Redirect to login page after logout
    }
    setActiveClassToOffres(tag: string): void {
      // Get the sidebar element by its ID
      const sidebar: HTMLElement | null = document.getElementById('sidebar');
      if (sidebar) {
        // Get all list items within the sidebar
        const listItems: NodeListOf<HTMLLIElement> = sidebar.querySelectorAll('li');
        listItems.forEach(listItem => {
          // Get the anchor element within the list item
          const anchorElement: HTMLAnchorElement | null = listItem.querySelector('a');
          if (anchorElement) {
            const spanElement: HTMLSpanElement | null = anchorElement.querySelector('.text');
            if (spanElement && spanElement.textContent) {
              // Check if the text content of the span element matches the provided tag
              if (spanElement.textContent.trim() === tag) {
                // Add "active" class to the list item if it matches the provided tag
                listItem.classList.add('active');
              } else {
                // Remove "active" class from other list items
                listItem.classList.remove('active');
              }
            }
          }
        });
      } else {
        console.log("Sidebar not found!");
      }
    }

    status = false;

    addToggle() {
        const sidebar: HTMLElement | null = document.getElementById('sidebar');
        const content: HTMLElement | null = document.getElementById('content');

        if (sidebar) {
            this.status = !this.status; 
            if(content){
            
        if (this.status) {
          sidebar.classList.add('hide');
          content.style.width = 'calc(100% - 60px)';
          content.style.left = '60px';
      } else {
          sidebar.classList.remove('hide');
          content.style.width = 'calc(100% - 280px)';
          content.style.left = '280px';
      }
    }
  }}

}
