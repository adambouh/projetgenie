import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChefDepartementService {

  constructor(private http: HttpClient) { }

  // Get the departement enseignants
  getEnseignantsByDepartement(id_departement: number): Observable<any> {
    const url = "http://localhost:8080/api/user/getUsersByRoleAndDep";
    const body = {
      "role": "Enseignant",
      "departementId": id_departement
    }
    return this.http.post(url, body)
      .pipe(
        tap((response: any) => { }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  // Send notification to all the departement enseignants
  sendNotificationToDepartement(emetteurID: number, departementID: number, message: string): Observable<any> {

    const url = "http://localhost:8080/api/notification/addNotificationForDepartement";
    const body = {
      "emetteur_id": emetteurID,
      "message": message,
      "depId": departementID
    }

    return this.http.post(url, body)
      .pipe(
        tap((response: any) => {
          console.log("notification send to the departement");
        }),
        catchError((error) => {
          console.log("error send notification to departement");

          return throwError(error);
        })
      );
  }

  // Send notification to a specific enseignant ef the departement
  addNotificationForListEnseignants(emetteurID: number, message: string, listEnseignants: any) {
    const url = "http://localhost:8080/api/notification/addNotificationForListUser";
    const body = {
      "emetteur_id": emetteurID,
      "message": message,
      "listeUserId": listEnseignants
    }
    return this.http.post(url, body)
      .pipe(
        tap((response: any) => {
          console.log("notification send to enseignants");
        }),
        catchError((error) => {
          console.log("error");
          return throwError(error);
        })
      );
  }

  // Send notification to a specific
  sendMessageToEneignant(emetteurID: number, message: string, enseignant: any) {
    const url = "http://localhost:8080/api/notification/addNotificationForUser";
    const body = {
      "emetteur_id": emetteurID,
      "message": message,
      "userId": enseignant.id
    }
    return this.http.post(url, body)
      .pipe(
        tap((response: any) => {
          console.log("notification send to enseignant");
        }),
        catchError((error) => {
          console.log("error");
          return throwError(error);
        })
      );
  }

  // Get all the resources demanded by the enseignants departement 
  getDemandesEnseignantsByDepartement(departementID: number) {
    return this.http.get<any[]>('http://localhost:8080/api/ressource/getRessourcesEnseignantsByDepartement?depId=' + departementID);
  }

  // Méthode pour supprimer un demande par ID
  deletedemandeById(demandeId: number): Observable<any> {
    const url = `http://localhost:8080/api/ressource/deleteRessource?id=${demandeId}`;
    return this.http.delete(url, {responseType: 'text'});
  }

  // Update ressource
  updateRessource(ressourceId: string, updatedRessource: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/ressource/updateRessource?id=${ressourceId}`, updatedRessource);
  }

  // Change the demandes status to traited
  changeDemandesStatus(departementID: number) {
    return this.http.put('http://localhost:8080/api/ressource/modifyEtatRessource?depId='+departementID, null);
  }
}
