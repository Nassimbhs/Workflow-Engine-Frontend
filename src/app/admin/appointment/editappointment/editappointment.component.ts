import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Activite } from "src/app/model/Activite";
import { Workflow } from "src/app/model/Workflow";
import { WorkflowService } from "src/app/service/workflow.service";

@Component({
  selector: "app-editappointment",
  templateUrl: "./editappointment.component.html",
  styleUrls: ["./editappointment.component.sass"],
})
export class EditappointmentComponent implements OnInit {

  workflow: Workflow;
  id: any;
  activites: Activite;

  constructor(
    private ser:WorkflowService, 
    private ac: ActivatedRoute,
    private router: Router
    ) {
  }
  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      this.id = params['id']
    });
    this.getWorkflowById(this.id);
    this.getAllWorkflows();
    this.getActivitesByWorkflowId(this.id);
  }

  
  updateWorkflow(){
    this.ser.updateWorkflow(this.workflow).subscribe(()=>this.router.navigateByUrl("admin/appointment/viewAppointment")
    );
  }

  workflowNodes = [];
  listWorkflow: any[];

  getAllWorkflows(){
    this.ser.getAllWorkflows().subscribe((res) => {
      this.listWorkflow = res;
      this.workflowNodes = this.listWorkflow.map(({ name }) => ({ id : name, label: name }));
      });
  }

  workflowNodes2 = {};

  getWorkflowById(id :any){
    this.ser.getWorkflowById(id).subscribe(
      res => {
        this.workflow = res;
        this.workflowNodes2 = {id: this.workflow.id, label : this.workflow.name}
      });
  }

  tachenode = {};
  getActivitesByWorkflowId(id :any){
    this.ser.getActivitesByWorkflowId(id).subscribe(
      res => {
        this.activites = res;
        this.tachenode = {id: this.workflow.id, label : this.activites[0].name}
        console.log(this.tachenode);

      });
  }
}