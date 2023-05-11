import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { GroupeUser } from "src/app/model/GroupeUser";
import { GroupeUserService } from "src/app/service/groupe-user.service";
import { UserService } from "src/app/service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-edit-group",
  templateUrl: "./edit-group.component.html",
  styleUrls: ["./edit-group.component.sass"],
})
export class EditgroupComponent implements OnInit {

  id: any;
  groups: GroupeUser;
  userFilterCtrl = new FormControl();
  filteredUsers: Observable<any[]>;
  
  constructor(
    private groupeUserService: GroupeUserService,
    private ac: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar
    ) {
  }
  
  utilisateursParGroupe = {};
  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      this.id = params['id']
    });
    this.getGroupById(this.id);
    this.userService.getUsersByGroupId(this.id).subscribe(res => {
      this.utilisateursParGroupe[this.id] = res;
      console.log(res);
    });
    this.getUsersByRoleUser();
  }
  searchText : any = '';
  get filteredUserList() {
    return this.userList.filter(u => u.username.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  getGroupById(id: any) {
    this.groupeUserService.getGroupById(id).subscribe((res) => {
      this.groups = res;
    });
  }

    updateGroupUser() {
    this.groupeUserService.updateGroup(this.groups.id, this.groups).subscribe(
      (res) => {
      }
    );
  }

  userList =[];
  getUsersByRoleUser(){
    this.userService.getUsersByRoleUser().subscribe((res) =>
    {
      this.userList = res;
    });
  }

  selectedUserIds: any[]= [];
  addUserToGroup() {

    this.groupeUserService.addUsersToGroup(this.groups.id,this.selectedUserIds).subscribe(
      res => {
        this.userService.getUsersByGroupId(this.id).subscribe(res => {
          this.utilisateursParGroupe[this.id] = res;
          console.log(res);
        });
        this.snackBar.open('Utilisateur ajouté avec succès !', 'Close', {
          duration: 3000,
        });
        
      },
      err => {
        console.log(this.selectedUserIds, err);
      }
    );
  }
  
  onCheckboxChange(groupId: any, userId: any, isChecked: boolean) {
    if (!isChecked) {
      Swal.fire({
        title: 'Êtes-vous sûr(e) de vouloir désassigner cet utilisateur du groupe ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, désassigner',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.groupeUserService.removeUserFromGroup(groupId, userId)
            .subscribe(() => {
              console.log('utilisateur désassigné avec succès');
              this.userService.getUsersByGroupId(groupId).subscribe(res => {
                this.utilisateursParGroupe[groupId] = res;
              });
            }, (error) => {
              console.error('Erreur lors de la désassignation', error);
            });
        } else {
          // Rétablir la case à cocher si l'utilisateur annule
          this.utilisateursParGroupe[groupId].find(user => user.id === userId).isChecked = true;
        }
      });
    }
  }

}
