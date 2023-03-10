import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LienActivite } from '../model/LienActivite';

@Injectable({
  providedIn: 'root'
})
export class LienActiviteService {
  
  baseUrl = "http://localhost:8080/api/v1/LienActivite";

  constructor(private _http: HttpClient) { }
  
  addLink(lienActivite: LienActivite) {
    return this._http.post<LienActivite>(this.baseUrl + "/addlink/", lienActivite);
  }

  getAllLinks(): Observable<string[]> {
    return this._http.get<string[]>(this.baseUrl + "/allLinks/");
  }

}
