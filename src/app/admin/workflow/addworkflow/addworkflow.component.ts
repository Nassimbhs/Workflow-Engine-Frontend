import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Workflow } from "src/app/model/Workflow";
import { WorkflowService } from "src/app/service/workflow.service";

@Component({
  selector: "app-addworkflow",
  templateUrl: "./addworkflow.component.html",
  styleUrls: ["./addworkflow.component.sass"],
})
export class AddworkflowComponent {
 
  workflow : Workflow = new Workflow();

  constructor(
    private workflowservice:WorkflowService,
    private _router:Router,

    ) {
  }

  addWorkflow(){    
    this.workflowservice.addWorkflow(this.workflow).subscribe(
      (res)=>{
        this._router.navigateByUrl("admin/appointment/viewWorkflow");
      }
      );
  }
  
}
