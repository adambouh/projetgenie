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
    const url = "http://localhost:8080/api/panne/getPanneByRessourceUser?user_id="+enseignantID;
    return this.http.get(url);
  }

  // Get the resources affected to the enseignant
  getRessourcesByDemander(demanderID: number): Observable<any>{
    const url = "http://localhost:8080/api/ressource/getRessourcesByUserId?id="+demanderID;
    return this.http.get(url);
  }

  // Create need
  addNeed(need: any): Observable<any> {
    const url = "http://localhost:8080/api/ressource/addRessource";
    return this.http.post(url, need).pipe(
      tap((response: any) => {
        console.log("Le besoin est ajouté");
      }),
      catchError((error) => {
        console.log("Le besoin n'est pas ajouté");

        return throwError(error);
      })
    );
  }

  // Delete need
  deleteNeedById(needId: number): Observable<any> {
    const url = `http://localhost:8080/api/ressource/deleteRessource?id=${needId}`;
    return this.http.delete(url, {responseType: 'text'});
  }

  // From créée to en_cour_de_traitement
  changeNeedsStatus(needs: any[]): Observable<any>  {
    const url = "http://localhost:8080/api/ressource/modifyStatusRessources";
    const body = {
      ressourceIdList: needs,
      etatDemande: "En_Cours_De_Traitement",
    }

    return this.http.put(url, body);
  }

  // Update need
  updateNeed(needId: string, updatedNeed: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/ressource/updateRessource?id=${needId}`, updatedNeed);
  }
}
