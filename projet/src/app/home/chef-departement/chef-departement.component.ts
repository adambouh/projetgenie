import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChefDepartementService } from './chef-departement.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../home.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-chef-departement',
  templateUrl: './chef-departement.component.html',
  styleUrls: ['./chef-departement.component.css'],
})
export class ChefDepartementComponent extends HomeComponent{

}