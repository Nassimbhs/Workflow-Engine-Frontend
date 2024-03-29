import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../model/Tache';
import { Conge } from '../model/Conge';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private _http: HttpClient) { }

  baseUrl = "http://localhost:8091/api/v1/Tache";

  getTachesByWorkflowId(id: any): Observable<Tache> {
    return this._http.get<Tache>(this.baseUrl + "/taches/" + id);
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

  assignerTache(tacheId: any, userIds: any[],workflowId: any ): Observable<any> {
    const url = `${this.baseUrl}/${tacheId}/${workflowId}/assigner-utilisateurs`;
    return this._http.post(url, userIds);
  }

  getUtilisateursDeTache(tacheId: any): Observable<any> {
    return this._http.get(`${this.baseUrl}/${tacheId}/utilisateurs`);
  }

  desassignerTacheAUtilisateur(tacheId: any, userId: any): Observable<void> {
    const url = `${this.baseUrl}/${tacheId}/utilisateurs/${userId}`;
    return this._http.delete<void>(url);
  }

  getTasksByUser(userId: number): Observable<Tache[]> {
    const url = `${this.baseUrl}/users/${userId}/tasks`;
    return this._http.get<Tache[]>(url);
  }

  getTasksByUsertraite(userId: number): Observable<Tache[]> {
    const url = `${this.baseUrl}/users/${userId}/tachetraite`;
    return this._http.get<Tache[]>(url);
  }

  getAlltaches(): Observable<string[]> {
    return this._http.get<string[]>(this.baseUrl + "/allTache/");
  }

  assignGroupToTask(taskId: any, groupId: any): Observable<any> {
    const url = `${this.baseUrl}/tasks/${taskId}/assign/group/${groupId}`;
    return this._http.post<any>(url, taskId, groupId);
  }

  updateCongeStatut(tacheId: number): Observable<any> {
    const url = `${this.baseUrl}/taches/${tacheId}/conge`;
    return this._http.put(url, {});
  }
 
  
}