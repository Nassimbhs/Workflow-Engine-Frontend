import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TacheAtraiter } from '../model/TacheAtraiter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheAtraiterService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8091/api/v1/TacheAtraiter";
  
  getTacheAtraiterByResponsable(responsableId: number): Observable<TacheAtraiter[]> {
    const url = `${this.baseUrl}/responsable/${responsableId}`;
    return this.http.get<TacheAtraiter[]>(url);
  }

  marquerTacheCommeTraite(id: any, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + "/traite/" + id, value);
  }

  rejeterTache(id: any, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + "/rejeter/" + id, value);
  }

  getAlltachesAtraiter(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + "/allTacheAtraiter/");
  }

  getTacheAtraiterById(id: any): Observable<TacheAtraiter> {
    return this.http.get<TacheAtraiter>(this.baseUrl + "/getTacheAtraiter/" + id);
  }

  getTachesTraiteesParResponsable(responsableId: number): Observable<TacheAtraiter[]> {
    const url = this.baseUrl + "/traitees/" + responsableId;
    return this.http.get<TacheAtraiter[]>(url);
  }

  findByWorkflowId(workflowId: number){
    const url = this.baseUrl + "/findByWorkflowId/" + workflowId;
    return this.http.get<TacheAtraiter[]>(url);
  }
  
}