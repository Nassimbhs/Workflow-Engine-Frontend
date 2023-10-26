import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workflow } from '../model/Workflow';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  baseUrl = "http://localhost:8091/api/v1/Workflow";

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

  updateWorkflow(id: any, value: any): Observable<Object> {
    return this._http.put(this.baseUrl + "/update/" + id, value);
  }

  getWorkflowTables(workflowId: number): Observable<string[]> {
    const url = `${this.baseUrl}/${workflowId}/tables`;
    return this._http.get<string[]>(url);
  }
}
