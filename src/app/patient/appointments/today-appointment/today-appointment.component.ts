import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Conge } from "src/app/model/Conge";
import { Tache } from "src/app/model/Tache";
import { TacheAtraiter } from "src/app/model/TacheAtraiter";
import { CongeService } from "src/app/service/conge.service";
import { LienTacheService } from "src/app/service/lien-tache.service";
import { TacheAtraiterService } from "src/app/service/tache-atraiter.service";
import { TacheService } from "src/app/service/tache.service";
import { TokenStorageService } from "src/app/service/token-storage.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-today-appointment",
  templateUrl: "./today-appointment.component.html",
  styleUrls: ["./today-appointment.component.sass"],
})
export class TodayAppointmentComponent implements OnInit {

  currentUser: any;
  webhookResponse: string;
  conges: Conge;

  constructor(
    private tacheService: TacheService,
    private tokenStorage: TokenStorageService,
    private lienService: LienTacheService,
    private modalService: NgbModal,
    private congeService: CongeService,
    private tacheAtraiterService: TacheAtraiterService
  ) { }


  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getTasksByUser();
    this.getTasksByUsertraite();
  }

  listTache: any[];
  listLinks: any[];
  listTarget: any[] = [];
  firstTask: any[];
  ListAllTasks: any[];
  links: any[];
  targets: any[];
  listTaskByUser: any[];
  getTasksByUser() {
    this.tacheAtraiterService.getAlltachesAtraiter().subscribe((res) => {
      this.ListAllTasks = res;
      console.log("ListAllTasks : ",this.ListAllTasks)
      this.lienService.getAllLinks().subscribe((res) => {
        this.links = res;
        this.targets = this.links.map((link) => link.tacheTargetName);

        this.ListAllTasks.sort((a, b) => {
          const indexA = this.targets.indexOf(a.name);
          const indexB = this.targets.indexOf(b.name);
          return indexA - indexB;
        });
        this.tacheAtraiterService.getTacheAtraiterByResponsable(this.currentUser.id).subscribe((res) => {
          this.listTache = res;
          this.lienService.getAllLinks().subscribe((res) => {
            this.listLinks = res;
            this.listTarget = this.listLinks.map((link) => link.tacheTargetName);

            this.listTache.sort((a, b) => {
              const indexA = this.listTarget.indexOf(a.name);
              const indexB = this.listTarget.indexOf(b.name);
              return indexA - indexB;
            });
            this.firstTask = [];
            for (let i = 0; i < this.listTache.length; i++) {
              this.firstTask.push(this.listTache[i]);
              break;
            }
            this.ListAllTasks = this.ListAllTasks.filter(
              item => item.name !== "Début" && item.name !== "Fin" && item.statut === "non traité"
            );   
            console.log("ListAllTasks",this.ListAllTasks)
            console.log("firstTask",this.firstTask)
            if (this.ListAllTasks[0].name!==this.firstTask[0].name){
              this.firstTask =[];
            }
          });
        });
      });
    });
  }

  listTachetraite: any[];
  getTasksByUsertraite() {
    this.tacheService.getTasksByUsertraite(this.currentUser.id).subscribe((res) => {
      this.listTachetraite = res;
    });
  }

  conge: Conge = new Conge();
  addAndAssignCongeToTask(tacheId: any): void {
    this.tacheService.getTacheById(tacheId).subscribe((tache) => {
      this.conge.responsable = this.currentUser.username;
      this.congeService.addAndAssignCongeToTask(this.conge, tacheId)
        .subscribe(
          response => {
            this.getTasksByUser();
            this.getTasksByUsertraite();
            console.log('Conge added and assigned to Tache successfully');
          },
          error => {
            this.getTasksByUser();
            this.getTasksByUsertraite();
            console.log('Error adding and assigning Conge to Tache:', error);
          }
        );
    });
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }


  isLoading: boolean = false;
  tacheAtraiter: TacheAtraiter;
  marquerTacheCommeTraite(tacheId: any){
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir marquer cette tâche comme traitée ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.tacheAtraiterService.getTacheAtraiterById(tacheId).subscribe((tacheAtraiter) => {
            this.tacheAtraiterService.marquerTacheCommeTraite(tacheId, tacheAtraiter)
              .subscribe((res) => {
                console.log("res : ",res); 
                this.getTasksByUser();
                this.getTasksByUsertraite();
                this.isLoading = false;
              });
        });
      }
    });
  }
}