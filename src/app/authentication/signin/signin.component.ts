import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AuthenticationService } from "src/app/service/authentication.service";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { User } from "src/app/model/User";
import { Observable } from "rxjs";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  hide = true;
  errorMessage = '';
  roles: string[] = [];
  isLoggedIn = false;
  isLoginFailed = false;
  form: any = {
    username: '',
    password: ''
  };

  public currentUser: Observable<User>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenStorage: TokenStorageService,
  ) {
    super();
  }

  ngOnInit() {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    if (this.isLoggedIn) {
      this.router.navigate(["/admin/workflow/viewAppointment"]);
    }

  }

  onSubmit(): void {
    this.subs.sink = this.authenticationService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if (this.roles.includes("ROLE_ADMIN")) {
          this.router.navigate(["/admin/workflow/viewAppointment"]);
        }
      },
      err => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
        }
    );
  }

}
