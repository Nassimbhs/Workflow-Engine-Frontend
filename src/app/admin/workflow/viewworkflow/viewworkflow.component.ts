import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WorkflowService } from "src/app/service/workflow.service";
import { Workflow } from "src/app/model/Workflow";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-viewworkflow",
  templateUrl: "./viewworkflow.component.html",
  styleUrls: ["./viewworkflow.component.sass"],
})
export class ViewworkflowComponent
{
  listWorkflow: any[];
  workflow : Workflow;
  currentUser: any;
  constructor(
    public httpClient: HttpClient,
    private workflowService:WorkflowService,
    private router: Router,
    private modalService: NgbModal,
    private tokenStorage: TokenStorageService,
  ) {
  }
  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
    this.getAllWorkflows();
  }

  workflowNodes= [];

  getAllWorkflows(){
    this.workflowService.getAllWorkflows().subscribe((res) => {
      this.listWorkflow = res;
       this.workflowNodes = this.listWorkflow.map(({ id, name }) => ({ id : name, label: name }));
      console.log(this.workflowNodes);
      });
  }

deleteWorkflow(id: any) {
  Swal.fire({
    title: 'Êtes-vous sûr(e) ?',
    text: 'Voulez-vous vraiment supprimer ce workflow ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.isConfirmed) {
      this.workflowService.deleteWorkflow(id).subscribe(
        (response) => {
          console.log('Delete successful:', response);
          // Reload links after delete
          this.getAllWorkflows();
          Swal.fire('Workflow supprimé !', '', 'success');
        },
        (error) => {
          console.error('Delete failed:', error);
          Swal.fire('Erreur lors de la suppression du workflow !', '', 'error');
        }
      );
    }
  });
}

updateWorkflow(id: number) {
  this.router.navigate(['admin/workflow/edit-workflow', id]);
}

getWorkflowById(id :any) {
  this.workflowService.getWorkflowById(id).subscribe((data) => {
    this.workflow = data;
  });
}

Basicopen(content) {
  this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
}

}