import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cv } from '../model/Cv';

@Injectable({
  providedIn: 'root'
})
export class CvService {


  baseUrl = "http://localhost:8093/api/v1/Cv";

  constructor(private http: HttpClient) { }

  createCv(cv: any, tacheAtraiterId: number): Observable<any> {
    const url = `${this.baseUrl}/${tacheAtraiterId}`;
    return this.http.post<any>(url, cv);
  }

  assignCvToTacheAtraiter(cvId: number, tacheAtraiterId: number): Observable<Cv> {
    const url = `${this.baseUrl}/${cvId}/assign/${tacheAtraiterId}`;
    const body = { cvId, tacheAtraiterId };
    return this.http.post<Cv>(url, body);
  }

  getCvData(): Observable<Cv[]> {
    return this.http.get<Cv[]>(this.baseUrl+"/getAllCvs");
  }
  
  getCv(tacheAtraiterId: number): Observable<Cv> {
    const url = `${this.baseUrl}/${tacheAtraiterId}`;
    return this.http.get<Cv>(url);
  }

  findCvByWorkflow(workflowId: number): Observable<any> {
    const url = `${this.baseUrl}/findCvByWorkflow/${workflowId}`;
    return this.http.get(url);
  }

}