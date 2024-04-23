import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {

  constructor(private http: HttpClient) { }

  // Get all pannes
  getAllPannes(): Observable<any> {
    const url = "http://localhost:8080/api/panne/getPannes";
    return this.http.get(url);
  }

  // Affect the panne to the technicien
  takePanne(panneID: any, technicienID: number): Observable<any> {
    const url = "http://localhost:8080/api/panne/affectPanneToTechnicien?panneId="+panneID+"&userId="+technicienID;
    return this.http.put(url, null);
  }

  changePanneStatus(panneID: Number, etat: string): Observable<any> {
    const url = "http://localhost:8080/api/panne/modifyPanne?panne_id="+panneID;
    const body = {
      etatPanne: etat
    }
    return this.http.put(url, body);
  }

  // To add constat
  addConstat(constat: any): Observable<any> {
    const url = "http://localhost:8080/api/constat/addConstat";
    return this.http.post(url, constat);
  }
}
