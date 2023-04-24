import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/model/User";
import { UserService } from "src/app/service/user.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-edit-doctor",
  templateUrl: "./edit-doctor.component.html",
  styleUrls: ["./edit-doctor.component.sass"],
})
export class EditDoctorComponent {

  id: any;
  user: User;
  userForm: FormGroup;
  roles = ['Admin', 'User'];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['User', Validators.required],
      password: ['', Validators.required],
    });

    const userId = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(userId).subscribe(
      data => {
        this.user = data;
        this.userForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          role: this.user.role,
          password: this.user.password
        });
      }
    );
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe((response) => {
      console.log('Update successful:', response);
      location.reload();
      Swal.fire("User à jour !");
    },
      (error) => {
        console.error('Update failed:', error);
        Swal.fire("User n'est pas à jour !");
      }
    );

  }

}
