import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonData } from '../model/JsonData';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  baseUrl = "http://localhost:8085/api/v1/JsonData";

  constructor(private _http: HttpClient) { }

  addJsonDataAndAssociateTaches(responsable: number, jsonData: string): Observable<any> {
    const url = `${this.baseUrl}/add-json-data/${responsable}`;
    console.log('jsonData:', jsonData);
    return this._http.post(url, jsonData);
  }

  getJsonDataByTacheAtraiterId(tacheAtraiterId: number): Observable<JsonData[]> {
    const url = `${this.baseUrl}/jsonData/${tacheAtraiterId}`;
    return this._http.get<JsonData[]>(url);
  }

  updateStateToTreated(id: number): Observable<any> {
    const url = `${this.baseUrl}/update-state/${id}`;
    return this._http.put(url, null);
  }
  
}
