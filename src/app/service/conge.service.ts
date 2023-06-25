import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conge } from '../model/Conge';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  baseUrl = "http://localhost:8080/api/v1/Conge/";

  constructor(private http: HttpClient) { }

  addAndAssignCongeToTask(conge: Conge, tacheId: number): Observable<any> {
    const url = `${this.baseUrl}conges/taches/${tacheId}`;
    return this.http.post<any>(url, conge);
  }

  getCongeByTacheAndUser(tacheId: number, userId: number): Observable<Conge> {
    const url = `${this.baseUrl}byTask/${tacheId}/${userId}`;
    return this.http.get<Conge>(url);
  }
  
}
