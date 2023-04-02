import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Activite } from "src/app/model/Activite";
import { LienActivite } from "src/app/model/LienActivite";
import { Workflow } from "src/app/model/Workflow";
import { ActiviteService } from "src/app/service/activite.service";
import { LienActiviteService } from "src/app/service/lien-activite.service";
import { WorkflowService } from "src/app/service/workflow.service";
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
  private modalRef: NgbModalRef;
  isPlaying = false;

  constructor(
    private ser:WorkflowService, 
    private serActivite:ActiviteService, 
    private serlien :LienActiviteService, 

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
     if (this.isPlaying) {
    this.workflow.etat = 'en cours';
  } else {
    this.workflow.etat = 'en pause';
  }
    this.ser.updateWorkflow(this.workflow.id,this.workflow).subscribe( (response) => {
      console.log('Update successful:', response);
      location.reload();
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
        .map(({ id , source , target, type,workflowId}) => ({
          id : "w"+ Math.random().toString(36).substr(2, 8),
          source : source,
          target : target,
          label : type,
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

  formatDuration(duration: number): string {
    const milliseconds = duration * 24 * 60 * 60 * 1000;
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    const secondsText = seconds % 60 !== 0 ? `${seconds % 60} s` : '';
    const minutesText = minutes % 60 !== 0 ? `${minutes % 60} min ` : '';
    const hoursText = hours % 24 !== 0 ? `${hours % 24} h ` : '';
    const daysText = days !== 0 ? `${days} jours ` : '';
  
    return `${daysText}${hoursText}${minutesText}${secondsText}`;
  }
  
  nodesArray: {id: String, label: String, duration: string}[] = [];
  linksArray = [];
  ids = {};
  allactivites = [];
  
  getActivitesByWorkflowId(id: any) {
    this.serActivite.getActivitesByWorkflowId(id).subscribe(
      (res: any) => {
        this.allactivites = res;
        if (Array.isArray(res)) {
          this.nodesArray = res.map(activite => {
            const startDate = new Date(activite.startDate);
            const endDate = new Date(activite.endDate);
            const duration = Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
            const formattedDuration = this.formatDuration(duration);
            return {id: activite.id.toString(), label: activite.name, duration: formattedDuration};
          });
          this.ids = res.map(activite => activite.id.toString());
        }
         else {
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
          console.log("get link by id : ",this.actLink)

        });
  }

updateActivity() {
    this.serActivite.updateActivity(this.activites.id, this.activites)
      .subscribe(
        (response) => {
          console.log('Update successful:', response);
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
          location.reload();
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
  selectedTargetOui: string;
  selectedTargetNon: string;
  addLinks() {
    this.lienActivite.source = this.activites.id.toString();
    this.lienActivite.id = this.activites.id;
    this.lienActivite.workflowId = this.id;
    this.lienActivite.activiteSourceName = this.activites.name;
  
    if (this.selectedTarget === 'oui') {
      const targets = [this.selectedTargetOui];
      this.lienActivite.type = 'oui';
      for (let target of targets) {
        this.lienActivite.target = target;
        this.lienActivite.activiteTargetName = this.nodesArray.find(node => node.id === target)?.label;
  
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
    } else if (this.selectedTarget === 'oui-non') {
      if (this.selectedTargetOui === this.selectedTargetNon) {
        Swal.fire("Veuillez sélectionner des cibles différentes !");
        return;
      }
      const targets = [this.selectedTargetOui, this.selectedTargetNon];
      for (let target of targets) {
        if (this.selectedTargetNon === target){
          this.lienActivite.type = "non";
        }else
        {
          this.lienActivite.type = "oui"
        }
        this.lienActivite.target = target;
        this.lienActivite.activiteTargetName = this.nodesArray.find(node => node.id === target)?.label;
        const isLinkExists = this.listLinks.some(link => link.source === this.lienActivite.source && link.target === this.lienActivite.target);

        if (!this.lienActivite.source || !this.lienActivite.target) {
          return;
        } else if (isLinkExists) {
          Swal.fire("Le lien existe déjà !");
        } else {
          this.serlien.addLink(this.lienActivite).subscribe((response) => {
            console.log('Added successful:', response);
            Swal.fire("Lien ajoutée avec succès !");
            location.reload();
          }, (error) => {
            console.error('Add failed:', error);
            Swal.fire("Lien n'est pas ajoutée !");
          });
        }
      }
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
          this.modalRef.close();
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
  this.modalRef = this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
}

openModal2(content) {
  this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
}

openModalActivity(content) {
  this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
}

// Fonction qui calcule la largeur du texte du noeud
getTextWidth(text: string): number {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textNode.setAttribute('style', 'font-size: 12px; font-family: Arial');
  textNode.textContent = text;
  svg.appendChild(textNode);
  document.body.appendChild(svg);
  const width = textNode.getBBox().width;
  document.body.removeChild(svg);
  return width + 20; // Ajoute une marge de 20px à la largeur calculée
}

duration: number;
calculateDuration() {
  const start = this.activites.startDate.getTime();
  const end = this.activites.endDate.getTime();
  this.duration = end - start;
}

}