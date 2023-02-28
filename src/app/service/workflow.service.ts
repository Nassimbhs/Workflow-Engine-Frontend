import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activite } from '../model/Activite';
import { Workflow } from '../model/Workflow';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  baseUrl = "http://localhost:8080/api/v1/Workflow";

  constructor(private _http: HttpClient) { }

  getAllWorkflows(): Observable<string[]> {
    return this._http.get<string[]>(this.baseUrl + "/allWorkflows/");
  }
  
  addWorkflow(workflow: Workflow) {
    return this._http.post<Workflow>(this.baseUrl + "/addWorkflow", workflow);
  }

  deleteWorkflow(id: any): Observable<Workflow> {
    const url = this.baseUrl + '/delete/' + id;
    return this._http.delete<Workflow>(url);
  }

  getWorkflowById(id: any): Observable<Workflow> {
    return this._http.get<Workflow>(this.baseUrl + "/getWorkflow/" + id);
  }

  updateWorkflow(value: any): Observable<Object> {
    return this._http.put(this.baseUrl + "/update", value);
  }

  getActivitesByWorkflowId(id: any): Observable<Activite> {
    const url = "http://localhost:8080/api/v1/Activite/activites/";
    return this._http.get<Activite>(url + id);
  }
  
}
