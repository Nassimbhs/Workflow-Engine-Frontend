import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Activite } from "src/app/model/Activite";
import { Workflow } from "src/app/model/Workflow";
import { ActiviteService } from "src/app/service/activite.service";
import { WorkflowService } from "src/app/service/workflow.service";
import { v4 as uuidv4 } from 'uuid';

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
    private serActivite:ActiviteService, 

    private ac: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    
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
        this.workflowNodes2 = {id: "workflow", label : this.workflow.name};
      });
  }

  nodesArray: {id: String, label: String}[] = [];
  linksArray = [];
  ids = [];
  getActivitesByWorkflowId(id: any) {
    this.serActivite.getActivitesByWorkflowId(id).subscribe(
      (res: any) => {
        console.log(this.workflowNodes2);
        if (Array.isArray(res)) {
          this.nodesArray = res.map(activite => ({id: activite.id, label: activite.name}));
          this.nodesArray.push({id: "workflow", label: this.workflow.name});
          console.log(this.nodesArray);
          this.linksArray = this.nodesArray
          .filter(node => node.id !== 'workflow')
          .map(activite => {
            return {
              id : `${"t"}-${uuidv4()}`,
              source: "workflow",
              target: `${activite.id}`
            };
          });          
          console.log(this.linksArray);
        } else {
          console.error('res is not an array');
        }
      }
    );
  }  

  lista = [];
   act(id: any){
      this.serActivite.getActivityById(id).subscribe(
        res => {
          this.activites = res;
          this.lista.push(this.activites);
          console.log(res);
        });
  }
  
    // Bootstrap Modal
    Basicopen(content) {
      this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });

    }
}