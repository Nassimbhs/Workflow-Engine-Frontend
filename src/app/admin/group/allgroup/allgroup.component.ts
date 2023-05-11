import { Component, OnInit} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { GroupeUserService } from "src/app/service/groupe-user.service";
import Swal from "sweetalert2";
import { GroupeUser } from "src/app/model/GroupeUser";
import { AddDialogComponent } from "./dialog/add/add.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-allgroup",
  templateUrl: "./allgroup.component.html",
  styleUrls: ["./allgroup.component.sass"],
})
export class AllgroupComponent implements OnInit
{
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private groupeUserService : GroupeUserService,
    private modalService: NgbModal,
    private router: Router,
    private ac: ActivatedRoute
  ) {
  }

  id: any;
  ngOnInit() {
    this.getAllGroups();
    this.ac.params.subscribe(params => {
      this.id = params['id']
    });
  }

  addNew() {
    this.dialog.open(AddDialogComponent);
  }

  groups: GroupeUser;
  updateNew(id: any) {
    this.groupeUserService.getGroupById(id).subscribe((res) => {
      this.groups = res;
      console.log(res);
    });
  }
  
  listGroups: any;
  getAllGroups(){
    this.groupeUserService.getAllGroups().subscribe((res) => {
      this.listGroups = res;
      });
  }

  deleteGroup(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Voulez-vous vraiment supprimer ce groupe ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupeUserService.deleteGroup(id).subscribe(
          (response) => {
            console.log('Delete successful:', response);
            // Reload links after delete
            this.getAllGroups();
            Swal.fire('Groupe supprimé !', '', 'success');
          },
          (error) => {
            console.error('Delete failed:', error);
            Swal.fire('Erreur lors de la suppression du groupe !', '', 'error');
          }
        );
      }
    });
  }

  Basicopen(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }
  
  updateGroup(id: number) {
    this.router.navigate(['/admin/group/edit-group', id]);
  }

}