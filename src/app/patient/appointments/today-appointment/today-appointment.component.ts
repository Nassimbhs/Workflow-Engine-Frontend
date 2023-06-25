import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Conge } from "src/app/model/Conge";
import { Tache } from "src/app/model/Tache";
import { CongeService } from "src/app/service/conge.service";
import { LienTacheService } from "src/app/service/lien-tache.service";
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
    private http: HttpClient
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
    this.tacheService.getAlltaches().subscribe((res) => {
      this.ListAllTasks = res;
      this.lienService.getAllLinks().subscribe((res) => {
        this.links = res;
        this.targets = this.links.map((link) => link.tacheTargetName);

        this.ListAllTasks.sort((a, b) => {
          const indexA = this.targets.indexOf(a.name);
          const indexB = this.targets.indexOf(b.name);
          return indexA - indexB;
        });
        this.tacheService.getTasksByUser(this.currentUser.id).subscribe((res) => {
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
              this.congeService.getCongeByTacheAndUser(this.listTache[i].id, this.currentUser.id)
                .subscribe(
                  (res) => {
                    this.conges = res;
                    console.log("this is res : ", res)
                  },
                  (error) => {
                    console.error('Failed to retrieve congé:', error);
                  }
                );
              break;

            }
            this.ListAllTasks = this.ListAllTasks.filter(
              item => item.name !== "Début" && item.name !== "Fin" && item.statut === "non traité"
            );
            if (this.ListAllTasks[0].id != this.firstTask[0].id) {
              this.firstTask = [];
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

  isLoading: boolean = false;
  tache: Tache;
  marquerTacheCommeTraitee(tacheId: any) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir marquer cette tâche comme traitée ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.tacheService.getTacheById(tacheId).subscribe((tache) => {
          if (tache && tache.action === 'approbation') {
            tache.approbation = 'accepter';
            this.tacheService.updateTache(tacheId, tache)
              .subscribe(() => { 
                this.getTasksByUser();
                this.getTasksByUsertraite();
                this.isLoading = false;
              });
          } else {
            this.isLoading = false;
          }
        });
      }
    });
  }

  RefuserTache(tacheId: any) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir rejeter cette tâche ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.tacheService.getTacheById(tacheId).subscribe((tache) => {
          tache.approbation = 'rejeter';
          this.tacheService.updateTache(tacheId, tache)
            .subscribe(() => {
              this.getTasksByUser();
              this.getTasksByUsertraite();
              this.isLoading = false;
            });
        });
      }
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

}