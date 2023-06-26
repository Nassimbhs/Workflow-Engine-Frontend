import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TacheAtraiter } from '../model/TacheAtraiter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheAtraiterService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8080/api/v1/TacheAtraiter";
  
  getTacheAtraiterByResponsable(responsableId: number): Observable<TacheAtraiter[]> {
    const url = `${this.baseUrl}/responsable/${responsableId}`;
    return this.http.get<TacheAtraiter[]>(url);
  }

  marquerTacheCommeTraite(id: any, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + "/traite/" + id, value);
  }

  getAlltachesAtraiter(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + "/allTacheAtraiter/");
  }

  getTacheAtraiterById(id: any): Observable<TacheAtraiter> {
    return this.http.get<TacheAtraiter>(this.baseUrl + "/getTacheAtraiter/" + id);
  }
  
}