import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Activite } from "src/app/model/Activite";
import { LienActivite } from "src/app/model/LienActivite";
import { Workflow } from "src/app/model/Workflow";
import { ActiviteService } from "src/app/service/activite.service";
import { LienActiviteService } from "src/app/service/lien-activite.service";
import { WorkflowService } from "src/app/service/workflow.service";
import { DialogformComponent } from "src/app/ui/modal/dialogform/dialogform.component";
import { SimpleDialogComponent } from "src/app/ui/modal/simpleDialog.component";
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
  links: LienActivite[];
  simpleDialog: MatDialogRef<SimpleDialogComponent>;

  constructor(
    private ser:WorkflowService, 
    private serActivite:ActiviteService, 
    private serlien :LienActiviteService, 
    private dialogModel: MatDialog,

    private ac: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    ) {
  }
  liens = [];
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
  lien: any[];
  
  getAllLinks() {
    this.serlien.getAllLinks().subscribe((res) => {
      this.listLinks = res;
      this.lien =res;
      this.listLinks = this.listLinks.filter(link => link.workflowId === this.id)
        .map(({ id , source , target, workflowId}) => ({
          id : "w"+ Math.random().toString(36).substr(2, 8),
          source : source,
          target : target,
          workflowId : workflowId
        }));
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
  allactivites = []
  getActivitesByWorkflowId(id: any) {
    this.serActivite.getActivitesByWorkflowId(id).subscribe(
      (res: any) => {
        this.allactivites = res;
        console.log("all activities : ",this.allactivites)
        if (Array.isArray(res)) {
          this.nodesArray = res
          .map(activite => ({id: activite.id.toString(), label: activite.name}));
          this.ids = res.map(activite => activite.id.toString());
        } else {
          console.error('res is not an array');
        }
      }
    );
  }  

  lista = [];
  actLink = [];
   act(id: any){
      this.serActivite.getActivityById(id).subscribe(
        res => {
          this.activites = res;
          this.lista.push(this.activites);
        });
        this.serlien.getLinkActivite(id).subscribe((resl) => {
          // Utilisez les données récupérées ici
          this.actLink = resl;
        });
  }

// méthode pour mettre à jour l'activité
updateActivity() {
    this.serActivite.updateActivity(this.activites.id, this.activites)
      .subscribe(
        (response) => {
          console.log('Update successful:', response);
          Swal.fire("Activité à jour !");
          location.reload();
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
        location.reload();
        Swal.fire("Activité ajoutée avec succès !");
      },
      (error) => {
        console.error('Add failed:', error);
        Swal.fire("Activité n'est pas ajoutée !");
      }
    );
  }

  
deleteActivite(id: any) {
  Swal.fire({
    title: 'Êtes-vous sûr(e) ?',
    text: 'Voulez-vous vraiment supprimer cette activité ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.isConfirmed) {
      this.serActivite.deleteActivite(id).subscribe(
        (response) => {
          console.log('Delete successful:', response);
          this.getActivitesByWorkflowId(this.id);
          Swal.fire('Activité supprimé !', '', 'success');
        },
        (error) => {
          console.error('Delete failed:', error);
          Swal.fire("Erreur lors de la suppression d'une activité !", '', 'error');
        }
      );
    }
  });
}

  selectedTarget: string;

  addLinks(){    
    this.lienActivite.source = this.activites.id.toString();
    this.lienActivite.id = this.activites.id;
    this.lienActivite.id = this.lienActivite.id;
    this.lienActivite.workflowId = this.id;
    this.lienActivite.activiteSourceName = this.activites.name;
    this.lienActivite.target = this.selectedTarget;
    this.lienActivite.activiteTargetName = this.nodesArray.find(node => node.id === this.selectedTarget)?.label;
    
    const isLinkExists = this.listLinks.some(link => link.source === this.lienActivite.source && link.target === this.lienActivite.target);
    
    if (!this.lienActivite.source || !this.lienActivite.target) {
      return;
    } else if (isLinkExists) {
      Swal.fire("Le lien existe déjà !");
    } else {
      this.serlien.addLink(this.lienActivite).subscribe((response) => {
        console.log('Added successful:', response);
        location.reload();
        Swal.fire("Lien ajoutée avec succès !");
      }, (error) => {
        console.error('Add failed:', error);
        Swal.fire("Lien n'est pas ajoutée !");
      });
    }
    
}

deleteLink(id: any) {
  Swal.fire({
    title: 'Êtes-vous sûr(e) ?',
    text: 'Voulez-vous vraiment supprimer ce lien ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.isConfirmed) {
      this.serlien.deleteLink(id).subscribe(
        (response) => {
          console.log('Delete successful:', response);
          // Reload links after delete
          this.getAllLinks();
          Swal.fire('Lien supprimé !', '', 'success');
        },
        (error) => {
          console.error('Delete failed:', error);
          Swal.fire('Erreur lors de la suppression du lien !', '', 'error');
        }
      );
    }
  });
}

Basicopen(content) {
  this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
}

openModal2(content) {
  this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
}

}