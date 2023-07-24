import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Conge } from "src/app/model/Conge";
import { TacheAtraiter } from "src/app/model/TacheAtraiter";
import { CongeService } from "src/app/service/conge.service";
import { LienTacheService } from "src/app/service/lien-tache.service";
import { TacheAtraiterService } from "src/app/service/tache-atraiter.service";
import { TacheService } from "src/app/service/tache.service";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { CvService } from "src/app/service/cv.service";

import Swal from "sweetalert2";
import { Cv } from "src/app/model/Cv";

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
    private tacheAtraiterService: TacheAtraiterService,
    private cvService: CvService
  ) { }


  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getTasksByUser();
    this.getTasksByUsertraite();
    this.TacheTraiteParResponsable();
    this.fetchCvData();
  }

  listTache: any[];
  listLinks: any[];
  listTarget: any[] = [];
  firstTask: any[];
  ListAllTasks: any[];
  links: any[];
  targets: any[];
  listTaskByUser: any[];
  thisTaskList = [];
  orderedList: any[] = [];
  oui = [];
  non = [];

  getTasksByUser() {
    this.tacheAtraiterService.getAlltachesAtraiter().subscribe((res) => {
      this.ListAllTasks = res;

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

            this.listLinks.sort((a, b) => a.workflowId.localeCompare(b.workflowId));

            this.oui = this.listLinks.filter(
              item => item.type === "oui"
            );

            this.non = this.listLinks.filter(
              item => item.type === "non"
            );

            console.log("listTache", this.listTache)
            this.firstTask = [];
            for (let i = 0; i < this.listTache.length; i++) {
              this.firstTask.push(this.listTache[i]);
            }

            const workflowIdToFind = this.firstTask[0].workflowId;
            const matchingOuiItems = this.oui.filter((item) => item.workflowId === String(workflowIdToFind));
            const updatedOuiList = [...matchingOuiItems, ...this.oui.filter((item) => item.workflowId !== String(workflowIdToFind))];

            const hierarchy = {};

            const startingTask = updatedOuiList.find(task => task.tacheSourceName === "Début");
            if (startingTask) {
              hierarchy[startingTask.tacheSourceName] = startingTask.tacheTargetName;

              let currentTaskName = startingTask.tacheTargetName;
              while (currentTaskName !== "Fin") {
                const nextTask = updatedOuiList.find(task => task.tacheSourceName === currentTaskName);
                if (nextTask) {
                  hierarchy[nextTask.tacheSourceName] = nextTask.tacheTargetName;
                  currentTaskName = nextTask.tacheTargetName;
                } else {
                  break;
                }
              }
            }

            console.log("updatedOuiList ", updatedOuiList);
            console.log("non ", this.non);

            if (this.firstTask[0].statut === "traité") {
              this.firstTask = [];
            }

            this.orderedList = Object.keys(hierarchy).map(key => this.ListAllTasks.find(item => item.name === hierarchy[key]));
            console.log("orderedList ", this.orderedList);

            const filteredList = this.orderedList.filter(item => item && item.statut && item.statut === "non traité");
            console.log("filteredList ", filteredList);
            console.log("ListAllTasks ", this.ListAllTasks);
            console.log("listLinks ", this.listLinks);
            /*
                        for (let i = 1; i < this.orderedList.length; i++) {
                          if (this.orderedList[i-1].approbation === "en attente"){
                            this.firstTask = this.orderedList[i-1];
                            break;
                          }
                        }
                        console.log("firstTask ", this.firstTask);
            */

            for (let i = 1; i < this.orderedList.length; i++) {

              if (this.orderedList[i - 1].approbation === "Rejeter") {
                for (let j = 0; j < this.non.length; j++) {
                  if (this.non[j].tacheSourceName === this.orderedList[i - 1].name && this.non[j].workflowId === this.orderedList[i].workflowId) {
                    console.log(this.non[j].tacheSourceName);
                    console.log(this.non[j].tacheTargetName);
                    for (let k = 0; k < this.ListAllTasks.length; k++) {
                      if (this.ListAllTasks[k].name === this.non[j].tacheTargetName) {
                        console.log(this.non[j].tacheTargetName);
                        this.orderedList.splice(i, 0, this.ListAllTasks[k]);
                        filteredList.splice(0, 0, this.ListAllTasks[k]);

                      }
                      if (this.non[j].tacheTargetName === "Fin") {
                        this.firstTask = [];
                      }
                      if (this.listTache[0].name !== this.non[j].tacheTargetName) {
                        this.firstTask = [];
                      }
                    }
                  }
                }
              }
            }
            console.log("firstTask", this.firstTask);
            if (filteredList.length === 0) {
              this.firstTask = [];
            }
            if (filteredList.length > 0 && this.firstTask.length > 0) {
              if (filteredList[0].name !== this.firstTask[0].name) {
                this.firstTask = [];
              }
            }
            console.log("firstTask", this.firstTask);

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
  addConge(tacheAtraiterId: any): void {
    this.tacheAtraiterService.getTacheAtraiterById(tacheAtraiterId).subscribe(
      (tache) => {
        this.congeService.addCongeWithAssignment(this.conge, tacheAtraiterId).subscribe(
          response => {
            console.log('Conge added with assignment:', response);
          }
        );
      }
    );
  }

  cv: any = {
    formations: [],
    competences: []
  };
  formation: any = {};
  competence: any = {};

  createCV(tacheAtraiterId: any): void {
    const formations = this.cv.formations.map(formation => ({ ...formation }));
    const competences = this.cv.competences.map(competence => ({ ...competence }));

    this.cv.formations = formations;
    this.cv.competences = competences;

    this.cvService.createCv(this.cv, tacheAtraiterId).subscribe((cvResponse) => {
      const createdCvId = cvResponse.id;
      for (let i = 0; i < this.orderedList.length; i++) {
        this.cvService.assignCvToTacheAtraiter(createdCvId, this.orderedList[i].id).subscribe(
          (response) => {
            console.log('CV assigned to TacheAtraiter successfully:', response);
            this.tacheAtraiterService.getTacheAtraiterById(tacheAtraiterId).subscribe((tacheAtraiter) => {
              this.tacheAtraiterService.marquerTacheCommeTraite(tacheAtraiterId, tacheAtraiter)
                .subscribe(() => {
                  this.getTasksByUser();
                  this.TacheTraiteParResponsable();
                });
            });

          },
          (error) => {
            console.error('Failed to assign CV to TacheAtraiter:', error);
          }
        );
      }
    });
  }


  addFormation(): void {
    this.cv.formations.push({});
  }

  addCompetence(): void {
    this.cv.competences.push({});
  }

  isTacheTraite(task: any): boolean {
    return task.statut === 'traité';
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }


  isLoading: boolean = false;
  tacheAtraiter: TacheAtraiter;
  marquerTacheCommeTraite(tacheId: any) {
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
              this.isLoading = false;
              this.getTasksByUsertraite();
              this.TacheTraiteParResponsable();
            });
        });
      }
    });
  }

  tacheTraite = [];
  TacheTraiteParResponsable() {
    this.tacheAtraiterService.getTachesTraiteesParResponsable(this.currentUser.id).subscribe((res) => {
      this.tacheTraite = res;
    });
  }

  panelOpenState = false;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  cvList = [];
  fetchCvData() {
    this.cvService.getCvData().subscribe((cvData: Cv[]) => {
      this.cvList = cvData;
      console.log(this.cvList);
    });
  }

  rejeterTache(tacheId: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir rejeter cette tâche ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tacheAtraiterService.getTacheAtraiterById(tacheId).subscribe((tacheAtraiter) => {
          this.tacheAtraiterService.rejeterTache(tacheId, tacheAtraiter)
            .subscribe(() => {
              this.getTasksByUser();
              this.TacheTraiteParResponsable();
            });
        });
      }
    });
  }

}