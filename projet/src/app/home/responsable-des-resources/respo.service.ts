import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RespoService {

  constructor() { }
  
status = false;
addToggle()
{ console.log(this.status)
  this.status = !this.status;       
}

}
