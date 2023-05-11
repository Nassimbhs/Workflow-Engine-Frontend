import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/User";
import { TacheService } from "src/app/service/tache.service";
import { TokenStorageService } from "src/app/service/token-storage.service";

@Component({
  selector: "app-today-appointment",
  templateUrl: "./today-appointment.component.html",
  styleUrls: ["./today-appointment.component.sass"],
})
export class TodayAppointmentComponent implements OnInit {

  currentUser: any;
  constructor(private tacheService: TacheService,private tokenStorage: TokenStorageService
    ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getTasksByUser();
  }

  listTache :any[];
  getTasksByUser(){
    this.tacheService.getTasksByUser(this.currentUser.id).subscribe((res) =>{
      this.listTache = res;
      console.log(res);
    })
  }

}
