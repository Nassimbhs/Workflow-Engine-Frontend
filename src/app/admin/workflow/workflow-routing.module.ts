import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { AddworkflowComponent } from "./addworkflow/addworkflow.component";
import { ViewworkflowComponent } from "./viewworkflow/viewworkflow.component";
import { EditworkflowComponent } from "./editworkflow/editworkflow.component";
const routes: Routes = [
  {
    path: "addWorkflow",
    component: AddworkflowComponent,
  },
  {
    path: "viewWorkflow",
    component: ViewworkflowComponent,
  },
  {
    path: "edit-workflow/:id",
    component: EditworkflowComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}
