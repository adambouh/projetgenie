import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { responsabledesresources } from '../responsable-des-resources.component';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent extends responsabledesresources implements OnInit{
  tag="Personels"
  user_id:any=-1;
  route: ActivatedRoute = inject(ActivatedRoute);
  override ngOnInit() {
    this.user_id = Number(this.route.snapshot.params['id']);
    console.log(this.user_id)
}
}
