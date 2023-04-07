import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:8080/api/v1/User/";

  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<string[]> {
    return this._http.get<string[]>(this.baseUrl + "allUser/");
  }
}
