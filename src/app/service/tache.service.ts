import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../model/Tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private _http: HttpClient) { }

  baseUrl = "http://localhost:8080/api/v1/Tache";

  getTachesByWorkflowId(id: any): Observable<Tache> {
    return this._http.get<Tache>(this.baseUrl+"/taches/" + id);
  }

  getTacheById(id: any): Observable<Tache> {
    return this._http.get<Tache>(this.baseUrl + "/getTache/" + id);
  }
  
  updateTache(id: any, value: any): Observable<Object> {
    return this._http.put(this.baseUrl + "/update/" + id, value);
  }

  addTache(tache: Tache) {
    return this._http.post<Tache>(this.baseUrl + "/addTache", tache);
  }

  deleteTache(id: any): Observable<Tache> {
    const url = this.baseUrl + '/delete/' + id;
    return this._http.delete<Tache>(url);
  }

  assignerTache(tacheId: any, userIds: any[]): Observable<any> {
    const url = `${this.baseUrl}/${tacheId}/assigner-utilisateurs`;
    return this._http.post(url, userIds);
  }
  
}