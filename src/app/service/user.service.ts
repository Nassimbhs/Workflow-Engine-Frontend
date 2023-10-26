import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { Role } from '../core/models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:8092/api/v1/User/";

  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<string[]> {
    return this._http.get<string[]>(this.baseUrl + "allUser/");
  }

  updateUser(id: any, value: any): Observable<Object> {
    return this._http.put(this.baseUrl + "update/" + id, value);
  }

  getUserById(id: any): Observable<User> {
    return this._http.get<User>(this.baseUrl + "getUser/" + id);
  }

  getUserRoles(userId: number): Observable<Role[]> {
    return this._http.get<Role[]>(this.baseUrl +userId+"/roles");
  }
  
  getUsersByGroupId(groupId: any): Observable<any> {
    return this._http.get(`${this.baseUrl}groups/${groupId}`);
  }
  getUsersByRoleUser(): Observable<User[]> {
    return this._http.get<User[]>(this.baseUrl+"usersByRole");
  }

}
