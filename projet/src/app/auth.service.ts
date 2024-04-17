import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'authToken';
  private tokenExpirationKey = 'tokenExpiration';

  private id = "id";
  private first_name = "first_name";
  private last_name = "last_name";
  private username = "login";
  private password = "password";
  private notificationList = "notifications";
  private role = "role";
  private departementID = "departementID";
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const credentials = { "login": username, "password": password }; // Adjusting the credentials object to match backend expectation
    return this.http.post('http://localhost:8080/api/user/authentification', credentials)
      .pipe(
        tap((response: any) => {
          console.log(credentials)
          console.log(response)
          // Authentication succeeded, store the authentication token and its expiration date
          if (response.first_name) {
            localStorage.setItem(this.id, response.id);
            localStorage.setItem(this.first_name, response.first_name);
            localStorage.setItem(this.last_name, response.last_name);
            localStorage.setItem(this.username, response.login);
            localStorage.setItem(this.password, response.password);
            localStorage.setItem(this.notificationList, response.notificationList);
            localStorage.setItem(this.role, response.role);
            localStorage.setItem(this.departementID, response.departement.id);
          }
        }),
        catchError((error) => {
          // Handle login error
          return throwError(error);
        })
      );
  }

  logout() {
    // Clear authentication-related data from localStorage
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isValidSession();
  }

  private isValidSession(): boolean {
    const authToken = localStorage.getItem(this.first_name);

    if (authToken) {
      return true;// Check if the token is not expired
    }

    return false; // No valid session data found
  }

  private calculateTokenExpiration(token: string): Date {
    try {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken && decodedToken.exp) {
        return new Date(decodedToken.exp * 1000); // Convert to milliseconds
      }
    } catch (error) {
      console.error('Error parsing token expiration:', error);
    }
    return new Date(0); // Default to expired date if parsing fails
  }
}
