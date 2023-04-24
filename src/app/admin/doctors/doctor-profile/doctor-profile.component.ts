import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/service/token-storage.service";

@Component({
  selector: "app-doctor-profile",
  templateUrl: "./doctor-profile.component.html",
  styleUrls: ["./doctor-profile.component.sass"],
})
export class DoctorProfileComponent implements OnInit {
  currentUser: any;

  constructor(private tokenStorage: TokenStorageService) {}
  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    }
}
