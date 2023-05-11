import { MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit } from "@angular/core";
import { GroupeUser } from "src/app/model/GroupeUser";
import { GroupeUserService } from "src/app/service/groupe-user.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.sass"],
})
export class AddDialogComponent{
  groupeUser : GroupeUser = new GroupeUser();
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private groupeUserService : GroupeUserService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  listGroups: any;
  getAllGroups(){
    this.groupeUserService.getAllGroups().subscribe((res) => {
      this.listGroups = res;
      });
  }

  addGroupUser(){    
    this.groupeUserService.addGroup(this.groupeUser).subscribe(
      (res)=>{
        this.getAllGroups();
        this.onNoClick();
        location.reload();

      }
      );
  }


}