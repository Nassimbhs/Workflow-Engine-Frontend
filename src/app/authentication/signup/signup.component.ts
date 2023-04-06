import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/service/authentication.service";
import { User } from "src/app/model/User";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}
  
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ["", Validators.required],
      cpassword: ["", Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    const user: User = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      role: ["admin"],
      password: this.signupForm.value.password
    };
    this.authService.signup(user).subscribe(
      data => {
        this.router.navigate(['/authentication/signin']);
        if (data && data.message) {
          Swal.fire({
            title: 'Success',
            text: data.message,
            icon: 'success'
          });
        }
      },
      (error: HttpErrorResponse) => {
        let errorMessage: string;
        if (error.status === 400 && error.error && error.error.message) {
          errorMessage = error.error.message;
        } else {
          errorMessage = error.message;
        }
        Swal.fire({
          title: 'Error',
          text: 'Username or email already in use ! ',
          icon: 'error'
        });
      }
    );
  }

} 
