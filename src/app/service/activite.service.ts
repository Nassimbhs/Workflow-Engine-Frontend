import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activite } from '../model/Activite';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  constructor(private _http: HttpClient) { }

  baseUrl = "http://localhost:8080/api/v1/Activite";

  getActivitesByWorkflowId(id: any): Observable<Activite> {
    return this._http.get<Activite>(this.baseUrl+"/activites/" + id);
  }

  getActivityById(id: any): Observable<Activite> {
    return this._http.get<Activite>(this.baseUrl + "/getActivite/" + id);
  }
  
  updateActivity(id: any, value: any): Observable<Object> {
    return this._http.put(this.baseUrl + "/update/" + id, value);
  }
}
