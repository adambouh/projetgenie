import { Component, OnInit } from '@angular/core';
import { responsabledesresources } from '../responsable-des-resources.component';
import { users } from 'src/app/users';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelsComponent extends responsabledesresources  implements OnInit  {
  private tag = 'Personels'
  
  filtred: users[] = [];

  override ngOnInit(): void {
    // Call the method to set "active" class to the list item with "Offres" link
    this.setActiveClassToOffres(this.tag);
  }
 

}
