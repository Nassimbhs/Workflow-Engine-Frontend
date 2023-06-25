import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Tache } from "src/app/model/Tache";
import { LienTache } from "src/app/model/LienTache";
import { Workflow } from "src/app/model/Workflow";
import { TacheService } from "src/app/service/tache.service";
import { LienTacheService } from "src/app/service/lien-tache.service";
import { WorkflowService } from "src/app/service/workflow.service";
import { SimpleDialogComponent } from "src/app/ui/modal/simpleDialog.component";
import Swal from "sweetalert2";
import { UserService } from "src/app/service/user.service";
import { GroupeUserService } from "src/app/service/groupe-user.service";
import { TableService } from "src/app/service/table.service";

@Component({
  selector: "app-editworkflow",
  templateUrl: "./editworkflow.component.html",
  styleUrls: ["./editworkflow.component.sass"],
})
export class EditworkflowComponent implements OnInit {

  workflow: Workflow;
  id: any;
  taches: Tache;
  tache: Tache = new Tache();
  lienTache: LienTache = new LienTache();
  links: LienTache[];
  simpleDialog: MatDialogRef<SimpleDialogComponent>;
  private modalRef: NgbModalRef;
  isPlaying = false;

  constructor(
    private ser: WorkflowService,
    private serTache: TacheService,
    private serlien: LienTacheService,
    private serUser: UserService,
    private ac: ActivatedRoute,
    private modalService: NgbModal,
    private groupService: GroupeUserService,
    private tableService: TableService
  ) {  
  }
  liens = [];
  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      this.id = params['id']
    });
    this.getWorkflowById(this.id);
    this.getAllWorkflows();
    this.getTachesByWorkflowId(this.id);
    this.getAllLinks();
    this.getUsersByRoleUser();
    this.getAllGroups();
    this.getWorkflowTables();
  }

  updateWorkflow() {
    if (this.isPlaying) {
      this.workflow.etat = 'en cours';
    } else {
      this.workflow.etat = 'en pause';
    }
    this.ser.updateWorkflow(this.workflow.id, this.workflow).subscribe((response) => {
      console.log('Update successful:', response);
      location.reload();
    },
      (error) => {
        console.error('Update failed:', error);
        Swal.fire("Workflow n'est pas à jour !");
      }
    );

  }

  workflowNodes = [];
  listWorkflow: any[];

  getAllWorkflows() {
    this.ser.getAllWorkflows().subscribe((res) => {
      this.listWorkflow = res;
      this.workflowNodes = this.listWorkflow.map(({ name }) => ({ id: name, label: name }));
    });
  }

  listLinks: any[];
  lien: any[];

  getAllLinks() {
    this.serlien.getAllLinks().subscribe((res) => {
      this.listLinks = res;
      this.lien = res;
      this.listLinks = this.listLinks.filter(link => link.workflowId === this.id)
        .map(({ id, source, target, type, workflowId }) => ({
          id: "w" + Math.random().toString(36).substr(2, 8),
          source: source,
          target: target,
          label: type,
          workflowId: workflowId
        }));
    });
  }

  workflowNodes2 = {};

  getWorkflowById(id: any) {
    this.ser.getWorkflowById(id).subscribe(
      res => {
        this.workflow = res;
        this.workflowNodes2 = { id: "WORKFLOW", label: this.workflow.name };
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

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = '00';
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  nodesArray: { id: String, label: String, endDate: string,statut: string, approbation: string }[] = [];
  linksArray = [];
  ids = {};
  alltaches = [];
  getTachesByWorkflowId(id: any) {
    this.serTache.getTachesByWorkflowId(id).subscribe(
      (res: any) => {
        this.alltaches = res;
        if (Array.isArray(res)) {
          this.nodesArray = res.map(tache => {
            const startDate = new Date(this.getCurrentDate());
            const endDate = new Date(tache.endDate);
            endDate.setHours(endDate.getHours() - 1);
            console.log("start date :",startDate);
            console.log("end date :",endDate);

            const duration = Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
            const formattedDuration = this.formatDuration(duration);
            return {
              id: tache.id.toString(),
              label: tache.name,
              endDate: tache.endDate,
              statut: tache.statut,
              approbation: tache.approbation
            };
          });
          this.ids = res.map(tache => tache.id.toString());
        }
        else {
          console.error('res is not an array');
        }
      }
    );
  }

  lista = [];
  actLink = {};
  utilisateursParTache = {};

  act(id: any) {
    this.serTache.getTacheById(id).subscribe(res => {
      this.taches = res;
      this.lista.push(this.taches);
    });

    this.serlien.getLinkTache(id).subscribe(resl => {
      this.actLink = resl;
      console.log("get link by id : ", this.actLink);
    });

    this.serTache.getUtilisateursDeTache(id).subscribe(res => {
      this.utilisateursParTache[id] = res;
    });
  }

  updateTache() {
    this.serTache.updateTache(this.taches.id, this.taches)
      .subscribe(
        (response) => {
          console.log('Update successful:', response);
        },
        (error) => {
          console.error('Update failed:', error);
          Swal.fire("Tache n'est pas à jour !");
        }
      );
  }

  selectedUserIds: any[] = [];
  assignUsersToTask() {

    this.serTache.assignerTache(this.taches.id, this.selectedUserIds).subscribe(
      res => {
        console.log(this.selectedUserIds);
      },
      err => {
        console.log(this.selectedUserIds, err);
      }
    );
  }

  selectedGroupIds: any[] =[];
  assignUsersToGroup() {

    this.serTache.assignGroupToTask(this.taches.id, this.selectedGroupIds).subscribe(
      res => {
        console.log("this.selectedGroupIds: ",this.selectedGroupIds);
        console.log("this.taches.id : ",this.taches.id);
      },
      err => {
        console.log(this.selectedGroupIds, err);
      }
    );
  }

  onCheckboxChange(tacheId: any, userId: any, isChecked: boolean) {
    if (!isChecked) {
      this.serTache.desassignerTacheAUtilisateur(tacheId, userId)
        .subscribe(() => {
          console.log('Tâche désassignée avec succès');
          this.serTache.getUtilisateursDeTache(tacheId).subscribe(res => {
            this.utilisateursParTache[tacheId] = res;
          });
        }, (error) => {
          console.error('Erreur lors de la désassignation de la tâche', error);
        });
    }
  }

  addTache() {
    this.tache.workflowTache = { id: this.id };
    this.serTache.addTache(this.tache).subscribe(
      (response) => {
        console.log('Added successful:', response);
        location.reload();
        Swal.fire("Tache ajoutée avec succès !");
      },
      (error) => {
        console.error('Add failed:', error);
        Swal.fire("Tache n'est pas ajoutée !");
      }
    );
  }


  deleteTache(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Voulez-vous vraiment supprimer cette Tache ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serTache.deleteTache(id).subscribe(
          (response) => {
            console.log('Delete successful:', response);
            location.reload();
            Swal.fire('Tache supprimé !', '', 'success');
          },
          (error) => {
            console.error('Delete failed:', error);
            Swal.fire("Erreur lors de la suppression d'une Tache !", '', 'error');
          }
        );
      }
    });
  }

  selectedTarget: string;
  selectedTargetOui: string;
  selectedTargetNon: string;
  addLinks() {
    this.lienTache.source = this.taches.id.toString();
    this.lienTache.id = this.taches.id;
    this.lienTache.workflowId = this.id;
    this.lienTache.tacheSourceName = this.taches.name;

    if (this.selectedTarget === 'oui') {
      const targets = [this.selectedTargetOui];
      this.lienTache.type = 'oui';
      for (let target of targets) {
        this.lienTache.target = target;
        this.lienTache.tacheTargetName = this.nodesArray.find(node => node.id === target)?.label;

        const isLinkExists = this.listLinks.some(link => link.source === this.lienTache.source && link.target === this.lienTache.target);

        if (!this.lienTache.source || !this.lienTache.target) {
          return;
        } else if (isLinkExists) {
          Swal.fire("Le lien existe déjà !");
        } else {
          this.serlien.addLink(this.lienTache).subscribe((response) => {
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
        if (this.selectedTargetNon === target) {
          this.lienTache.type = "non";
        } else {
          this.lienTache.type = "oui"
        }
        this.lienTache.target = target;
        this.lienTache.tacheTargetName = this.nodesArray.find(node => node.id === target)?.label;
        const isLinkExists = this.listLinks.some(link => link.source === this.lienTache.source && link.target === this.lienTache.target);

        if (!this.lienTache.source || !this.lienTache.target) {
          return;
        } else if (isLinkExists) {
          Swal.fire("Le lien existe déjà !");
        } else {
          this.serlien.addLink(this.lienTache).subscribe((response) => {
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

  openModalTache(content) {
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


  listUser: any[];
  getUsersByRoleUser() {
    this.serUser.getUsersByRoleUser().subscribe((res) => {
      this.listUser = res;
    });
  }

  listGroupe: any[];
  getAllGroups() {
    this.groupService.getAllGroups().subscribe((res) => {
      this.listGroupe = res;
    });
  }

  searchText : any = '';
  get filteredUserList() {
    return this.listUser.filter(u => u.username.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  searchTextGroup : any = '';
  get filteredGroupList() {
    return this.listGroupe.filter(u => u.nom.toLowerCase().includes(this.searchTextGroup.toLowerCase()));
  }

  listTables = [];
  getWorkflowTables(): void {
    this.ser.getWorkflowTables(this.id).subscribe((res) => {
      this.listTables = res;
      console.log("this.listTables: ",this.listTables);
    });
  }
  
}