import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { AppointmentService } from "../../appointment.service";
import { WorkflowService } from "src/app/service/workflow.service";
@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.sass"],
})
export class DeleteDialogComponent implements OnInit{
  listWorkflow: any[];
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public appointmentService: AppointmentService,
    private workflowService:WorkflowService
  ) {}
  ngOnInit(): void {
    this.getAllWorkflows();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.appointmentService.deleteAppointment(this.data.id);
  }

  deleteWorkflow(id: any) {
    this.workflowService.deleteWorkflow(id).subscribe(res => {
      console.log(res);
    });
  }

  getAllWorkflows(){
    this.workflowService.getAllWorkflows().subscribe(res => {
      console.log("Voici le workflow :"+res);
      this.listWorkflow = res
    });
}
}
