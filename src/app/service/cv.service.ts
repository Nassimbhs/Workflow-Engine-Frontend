import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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


  assignCVToTacheAtraiter(cvId: any, tacheAtraiterId: any): Observable<any> {
    const url = `${this.baseUrl}/${cvId}/assign-tache/${tacheAtraiterId}`;
    return this.http.post(url, null);
  }

  getCvData(): Observable<Cv[]> {
    return this.http.get<Cv[]>(this.baseUrl+"/getAllCvs");
  }

}
