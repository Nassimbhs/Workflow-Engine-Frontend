import { MatDialogRef } from "@angular/material/dialog";
import { Component, Input } from "@angular/core";
import { GroupeUser } from "src/app/model/GroupeUser";
import { GroupeUserService } from "src/app/service/groupe-user.service";
@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.sass"],
})
export class UpdateDialogComponent {
  groupeUser: GroupeUser = new GroupeUser();
  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    private groupeUserService: GroupeUserService
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  id: any;
  updateGroupUser() {
    this.groupeUserService.updateGroup(this.id, this.groupeUser).subscribe(
      (res) => {
        this.onNoClick();
        location.reload();
      }
    );
  }
}
