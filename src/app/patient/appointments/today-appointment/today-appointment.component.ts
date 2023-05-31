import { Component, OnInit } from "@angular/core";
import { Tache } from "src/app/model/Tache";
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
  constructor(
    private tacheService: TacheService,
    private tokenStorage: TokenStorageService,
    private lienService: LienTacheService
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
                break;
            }
            this.ListAllTasks = this.ListAllTasks.filter(
              item => item.name !== "Début" && item.name !== "Fin" && item.statut === "non traité"
            );
            console.log(this.ListAllTasks[0])
            console.log(this.firstTask[0])
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
        this.tacheService.getTacheById(tacheId).subscribe((tache) => {
          tache.statut = 'traité';

          this.tacheService.updateTache(tacheId, tache)
            .subscribe(() => {
              this.getTasksByUser();
              this.getTasksByUsertraite();
            });
        });
      }
    });

  }


}