import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { GroupeUser } from '../model/GroupeUser';

@Injectable({
  providedIn: 'root'
})
export class GroupeUserService {

  baseUrl = "http://localhost:8092/api/v1/GroupeUser/";

  constructor(private _http: HttpClient) { }

  getAllGroups(): Observable<string[]> {
    return this._http.get<string[]>(this.baseUrl + "allgroups/");
  }

  addGroup(GroupeUser: GroupeUser) {
    return this._http.post<GroupeUser>(this.baseUrl + "addGroupeUser", GroupeUser);
  }

  updateGroup(id: any, value: any): Observable<Object> {
    return this._http.put(this.baseUrl + "update/" + id, value);
  }

  deleteGroup(id: any): Observable<GroupeUser> {
    const url = this.baseUrl + 'delete/' + id;
    return this._http.delete<GroupeUser>(url);
  }

  getGroupById(id: any): Observable<GroupeUser> {
    return this._http.get<GroupeUser>(this.baseUrl + "getGroup/" + id);
  }
  
  addUsersToGroup(groupId: number, userIds: number[]): Observable<any> {
    const url = `${this.baseUrl}groups/${groupId}/users`;
    return this._http.post(url, userIds);
  }
 
  removeUserFromGroup(groupId: number, userId: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}${groupId}/users/${userId}`);
  }
  
}