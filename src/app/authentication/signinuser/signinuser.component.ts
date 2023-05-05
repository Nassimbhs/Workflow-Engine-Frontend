import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-signinuser',
  templateUrl: './signinuser.component.html',
  styleUrls: ['./signinuser.component.sass']
})
export class SigninuserComponent implements OnInit {
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
  ) {}

  ngOnInit() {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    if (this.isLoggedIn) {
      this.router.navigate(["/admin/workflow/viewWorkflow"]);
    }

  }

  onSubmit(): void {
    this.authenticationService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if (this.roles.includes("ROLE_USER")) {
          this.router.navigate(["/patient/appointments/today"]);
        }
      },
      err => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
        }
    );
  }

}
