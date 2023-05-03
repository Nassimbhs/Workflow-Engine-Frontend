import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/User";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { UserService } from "src/app/service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-doctor-profile",
  templateUrl: "./doctor-profile.component.html",
  styleUrls: ["./doctor-profile.component.sass"],
})
export class DoctorProfileComponent implements OnInit {
  currentUser: any;
  user: User = new User();

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.user.username = this.currentUser.username;
    this.user.email = this.currentUser.email;
    this.user.password = this.currentUser.password;
  }

  updateUser() {
    if (this.user.password === '') {
      this.userService.updateUser(this.currentUser.id, this.user).subscribe(
        (response) => {
          console.log('Update successful:', response);
          this.currentUser.username = this.user.username;
          this.currentUser.email = this.user.email;
          this.currentUser.password = this.currentUser.password;
          location.reload();
        },
        (error) => {
          console.error('Update failed:', error);
          Swal.fire("Tache n'est pas à jour !");
        }
      );
    } else {
      this.userService.updateUser(this.currentUser.id, this.user).subscribe(
        (response) => {
          console.log('Update successful:', response);
          this.currentUser.username = this.user.username;
          this.currentUser.email = this.user.email;
          this.currentUser.password = this.user.password;
          this.tokenStorage.saveUser(this.currentUser);
          location.reload();
        },
        (error) => {
          console.error('Update failed:', error);
          Swal.fire("Tache n'est pas à jour !");
        }
      );
    }
  }

}
