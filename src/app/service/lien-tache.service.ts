import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LienTache } from '../model/LienTache';

@Injectable({
  providedIn: 'root'
})
export class LienTacheService {
  
  baseUrl = "http://localhost:8080/api/v1/LienTache";

  constructor(private _http: HttpClient) { }
  
  addLink(lienTache: LienTache) {
    return this._http.post<LienTache>(this.baseUrl + "/addlink/", lienTache);
  }

  getAllLinks(): Observable<string[]> {
    return this._http.get<string[]>(this.baseUrl + "/allLinks/");
  }
  
  findLienTacheByWorkflowId(workflowId: any): Observable<LienTache> {
    return this._http.get<LienTache>(this.baseUrl + "/lientaches/" + workflowId);
  }

  deleteLink(id: any): Observable<LienTache> {
    const url = this.baseUrl + '/delete/' + id;
    return this._http.delete<LienTache>(url);
  }

  getLinkTache(id: any) {
    return this._http.get<LienTache[]>(this.baseUrl+"/getLinkTache/"+id);
  }

}
