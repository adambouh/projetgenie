import { Component } from '@angular/core';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-responsable-des-resources',
  templateUrl: './responsable-des-resources.component.html',
  styleUrls: ['./responsable-des-resources.component.css']
})
export class responsabledesresources extends HomeComponent {
  setActiveClassToOffres(tag: string): void {
    // Get the sidebar element by its ID
    const sidebar: HTMLElement | null = document.getElementById('sidebar');
    if (sidebar) {
      console.log("Sidebar found:", sidebar);
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
}  