import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Workflow } from "src/app/model/Workflow";
import { WorkflowService } from "src/app/service/workflow.service";

@Component({
  selector: "app-bookappointment",
  templateUrl: "./bookappointment.component.html",
  styleUrls: ["./bookappointment.component.sass"],
})
export class BookappointmentComponent {
 
  workflow : Workflow = new Workflow();

  constructor(
    private workflowservice:WorkflowService,
    private _router:Router,

    ) {
  }

  addWorkflow(){    
    console.log(this.workflow)
    this.workflowservice.addWorkflow(this.workflow).subscribe(
      (res)=>{
        console.log(res)
        this._router.navigateByUrl("admin/appointment/viewAppointment");
      }
      );
  }

}
