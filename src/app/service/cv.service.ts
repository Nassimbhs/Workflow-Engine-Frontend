import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cv } from '../model/Cv';

@Injectable({
  providedIn: 'root'
})
export class CvService {


  baseUrl = "http://localhost:8080/api/v1/Cv";

  constructor(private http: HttpClient) { }

  createCv(cv: any, tacheAtraiterId: number): Observable<any> {
    const url = `${this.baseUrl}/${tacheAtraiterId}`;
    return this.http.post<any>(url, cv);
  }

  assignCvToTacheAtraiter(cvId: number, tacheAtraiterId: number): Observable<Cv> {
    const url = `${this.baseUrl}/${cvId}/assign/${tacheAtraiterId}`;
    return this.http.post<Cv>(url, {}, { responseType: 'json' });
  }

  getCvData(): Observable<Cv[]> {
    return this.http.get<Cv[]>(this.baseUrl+"/getAllCvs");
  }

}
