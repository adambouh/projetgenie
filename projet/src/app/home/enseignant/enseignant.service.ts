import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private http: HttpClient) { }

  // Get the resources affected to the enseignant
  getRessourcesByEnseignant(enseignantID: number): Observable<any>{
    const url = "http://localhost:8080/api/ressource/getRessourcesByEnseignant?enseignantId="+enseignantID;
    return this.http.get(url);
  }

  signalPanne(resourceID: number) {
    const url = "http://localhost:8080/api/panne/addPanneToRessource?ressource_id="+resourceID;
    const body = {}

    return this.http.post(url, body);
  }

  // Get pannes
  getPannesByEnseignant(enseignantID: number): Observable<any> {
    const url = "http://localhost:8080/api/panne/getPanneByUserId?user_id="+enseignantID;
    return this.http.get(url);
  }
}
