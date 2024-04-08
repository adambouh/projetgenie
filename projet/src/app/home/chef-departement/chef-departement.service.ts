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
      { id: '21', name: 'mohammed kharmichi',  cpu:"2.9GH", ram:"20 G DDR4", disque:"1G ssd", ecran: 1, date: '19/05/2024', type: 'pc'},
      { id: '21', name: 'mohammed kharmichi',  cpu:"2GH", ram:"20 G D4", disque:"1G ssd", ecran: 0, date: '19/05/2024', type: 'pc'},
      { id: '21', name: 'mohammed kharmichi',  vitesse: '10', resolution: '20', date: '19/05/2024', type: 'imprimante'},
      { id: '21', name: 'mohammed kharmichi',  vitesse: '40', resolution: '40', date: '19/05/2024', type: 'imprimante'},
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

   // Méthode pour supprimer un besoin par ID
   deleteBesoinById(besoinId: number): Observable<any> {
    const url = `http://localhost:8080/api/chef/getNotifications/${besoinId}`; 
    return this.http.delete(url);
  }

  // Méthode pour récupérer les notification d'un utilisateur par l'ID
  getEnseignants(id_dep: number): Observable<any[]> {
    // return this.http.get<any[]>('http://localhost:8080/api/chef/getEnseignants/' + id_dep);
    
    // Simuler une réponse JSON
    const fakeResponse = [
      { id: '1', nom: 'mohammed', prenom: 'kharmichi'},
      { id: '1', nom: 'aya', prenom: 'fellah'},
      { id: '1', nom: 'adam', prenom: 'adam'},
      { id: '1', nom: 'houda', prenom: 'houda'},
      // Autres données simulées
    ];

    // Retourner un Observable contenant la réponse simulée
    return of(fakeResponse);
  }

  // Méthode pour récupérer les notification d'un utilisateur par l'ID
  getNotifications(id_recepteur: number): Observable<any[]> {
    // return this.http.get<any[]>('http://localhost:8080/api/chef/getNotifications/' + id_recepteur);
    
    // Simuler une réponse JSON
    const fakeResponse = [
      { id: '1', sender: 'mohammed kharmichi', contenu: 'Vous a anvoye ses besions', date: '17/02/0202', etat: 'non lu'},
      { id: '1', sender: 'mohammed kharmichi', contenu: 'Vous a anvoye ses besions', date: '17/02/0202', etat: 'non lu'},
      { id: '1', sender: 'mohammed kharmichi', contenu: 'Vous a anvoye ses besions', date: '17/02/0202', etat: 'non lu'},
      { id: '1', sender: 'mohammed kharmichi', contenu: 'Vous a anvoye ses besions', date: '17/02/0202', etat: 'non lu'},
      // Autres données simulées
    ];

    // Retourner un Observable contenant la réponse simulée
    return of(fakeResponse);
  }
}
