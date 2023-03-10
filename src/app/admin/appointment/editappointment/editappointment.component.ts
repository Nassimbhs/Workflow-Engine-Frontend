import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Activite } from "src/app/model/Activite";
import { LienActivite } from "src/app/model/LienActivite";
import { Workflow } from "src/app/model/Workflow";
import { ActiviteService } from "src/app/service/activite.service";
import { LienActiviteService } from "src/app/service/lien-activite.service";
import { WorkflowService } from "src/app/service/workflow.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-editappointment",
  templateUrl: "./editappointment.component.html",
  styleUrls: ["./editappointment.component.sass"],
})
export class EditappointmentComponent implements OnInit {

  workflow: Workflow;
  id: any;
  activites: Activite;
  activite : Activite = new Activite();
  lienActivite : LienActivite = new LienActivite();
  
  constructor(
    private ser:WorkflowService, 
    private serActivite:ActiviteService, 
    private serlien :LienActiviteService, 

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
    this.getAllLinks();
  }

  updateWorkflow(){
    this.ser.updateWorkflow(this.workflow.id,this.workflow).subscribe( (response) => {
      console.log('Update successful:', response);
      this.router.navigateByUrl("admin/appointment/viewAppointment");
      Swal.fire("Workflow à jour !");
    },
    (error) => {
      console.error('Update failed:', error);
      Swal.fire("Workflow n'est pas à jour !");
    }
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

  listLinks: any[];
  l: any[];
  getAllLinks(){
    this.serlien.getAllLinks().subscribe((res) => {
      this.listLinks = res;
      this.listLinks = this.listLinks.map(({ id , source , target}) => ({
        id : "w"+ Math.random().toString(36).substr(2, 8),
        source : source,
        target : target
    }));

      console.log(this.listLinks);
      });
  }

  workflowNodes2 = {};

  getWorkflowById(id :any){
    this.ser.getWorkflowById(id).subscribe(
      res => {
        this.workflow = res;
        this.workflowNodes2 = {id: "WORKFLOW", label : this.workflow.name};
      });
  }

  nodesArray: {id: String, label: String}[] = [];
  linksArray = [];
  ids = {};
  getActivitesByWorkflowId(id: any) {
    this.serActivite.getActivitesByWorkflowId(id).subscribe(
      (res: any) => {
        console.log(this.workflowNodes2);
        if (Array.isArray(res)) {
          this.nodesArray = res
          .map(activite => ({id: activite.id.toString(), label: activite.name}));
          this.ids = res.map(activite => activite.id.toString());
          console.log(this.ids);
          console.log(this.nodesArray);      
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

  updateActivity(){
    this.serActivite.updateActivity(this.activites.id, this.activites)
    .subscribe(
      (response) => {
        console.log('Update successful:', response);
        this.router.navigateByUrl("admin/appointment/viewAppointment");
        Swal.fire("Activité à jour !");
      },
      (error) => {
        console.error('Update failed:', error);
        Swal.fire("Activité n'est pas à jour !");
      }
    );
  }
  
  addActivite(){    
    this.activite.workflowActivite = { id: this.id };
    this.serActivite.addActivite(this.activite).subscribe(
      (response) => {
        console.log('Added successful:', response);
        Swal.fire("Activité ajoutée avec succès !");
      },
      (error) => {
        console.error('Add failed:', error);
        Swal.fire("Activité n'est pas ajoutée !");
      }
    );
  }

  addLinks(){    
    this.lienActivite.source = this.activites.id.toString();
    this.lienActivite.id = this.activites.id;
    this.lienActivite.id = this.lienActivite.id 
    this.serlien.addLink(this.lienActivite).subscribe((response) => {
      console.log('Added successful:', response);
      Swal.fire("Activité ajoutée avec succès !");
    },
    (error) => {
      console.error('Add failed:', error);
      Swal.fire("Activité n'est pas ajoutée !");
    }
  );
  }

    // Bootstrap Modal
    Basicopen(content) {
      this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });

    }

}