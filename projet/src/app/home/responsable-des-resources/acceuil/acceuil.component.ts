import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RespoService } from '../respo.service'; // Import the ChefService
import { responsabledesresources } from '../responsable-des-resources.component';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent extends responsabledesresources implements OnInit  {
  private tag = 'Acceuil'
  
  
  override ngOnInit(): void {
    // Call the method to set "active" class to the list item with "Offres" link
    this.setActiveClassToOffres(this.tag);
  }
 
}