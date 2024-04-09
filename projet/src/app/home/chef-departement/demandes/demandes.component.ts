import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChefDepartementService } from '../chef-departement.service';
import { ChefDepartementComponent } from '../chef-departement.component';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent {

  constructor() { }

  ngOnInit(): void {
  }

}
