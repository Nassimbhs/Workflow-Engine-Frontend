import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl = 'http://localhost:8091/api/v1';
  workflow: any;

  constructor(private http: HttpClient) { }

  getTables(jdbcUrl: string, username: string, password: string, sgbd: string): Observable<string[]> {
    const url = `${this.baseUrl}/tables`;

    // Prepare the request body
    const body = {
      jdbcUrl: jdbcUrl,
      username: username,
      password: password,
      sgbd: sgbd
    };

    // Set optional headers if required
    const headers = new HttpHeaders();

    // Make the HTTP POST request to the backend API
    return this.http.post<string[]>(url, body, { headers: headers });
  }
  
}