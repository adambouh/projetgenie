import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) {}

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users`, user);
    }
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/user/getAllUsers`);
  }
  
  getUserByLogin(userLogin: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/user/getUserByLogin?login=`+userLogin);
  }
  
  UpdateUser(userId: string, updatedUser: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/user/modifyUser?id=${userId}`, updatedUser);
  }

  UpdatePassword(userId: string, passwordPayload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/user/modifyPasswordUser?user_id=${userId}`, passwordPayload);
  }
  
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/users/${userId}`);
  }
  
  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post(`${this.baseUrl}/api/users/login`, credentials);
  }

  // Add other methods as needed, such as searchUsers, resetPassword, etc.
}
