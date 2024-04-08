import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChefDepartementService {

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les demandes des enseignants par département en utilisant son ID 
  getDemandesEnseignantsByDepartement(id: number): Observable<any[]> {
    // return this.http.get<any[]>('http://localhost:8080/api/chef/getDemandes/' + id);
    
    // Simuler une réponse JSON
    const fakeResponse = [
      { id: '21', name: 'mohammed kharmichi', resource: 'pc 20 g ram', date: '19/05/2024'
      },
      { id: '1', name: 'mohammed kharmichi', resource: 'pc 20 g ram', date: '19/05/2024' },
      // Autres données simulées
    ];

    // Retourner un Observable contenant la réponse simulée
    return of(fakeResponse);
  }

  // Méthode pour récupérer les notification d'un utilisateur par l'ID
  getNonSeenNotifications(id_user: number): Observable<any[]> {
    // return this.http.get<any[]>('http://localhost:8080/api/chef/getNotifications/' + id_user);
    
    // Simuler une réponse JSON
    const fakeResponse = [
      { id: '1', sender: 'mohammed kharmichi', contenu: 'j\'ai envoye mes besoins', date: '19/05/2024'
      },
      { id: '2', sender: 'mohammed km', contenu: 'j\'ai envoye mes besoins', date: '19/05/2024' },
      { id: '3', sender: 'mohammed kh', contenu: 'j\'ai envoye mes besoins', date: '19/05/2024' },
      { id: '1', sender: 'mohammed kharmichi', contenu: 'j\'ai envoye mes besoins', date: '19/05/2024'
      },
      { id: '2', sender: 'mohammed km', contenu: 'j\'ai envoye mes besoins', date: '19/05/2024' },
      { id: '3', sender: 'mohammed kh', contenu: 'j\'ai envoye mes besoins', date: '19/05/2024' },
      // Autres données simulées
    ];

    // Retourner un Observable contenant la réponse simulée
    return of(fakeResponse);
  }
}
