import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { AddgroupComponent } from "./add-group/add-group.component";
import { AllgroupComponent } from "./allgroup/allgroup.component";
import { EditgroupComponent } from "./edit-group/edit-group.component";
import { groupProfileComponent } from "./group-profile/staff-profile.component";
const routes: Routes = [
  {
    path: "all-group",
    component: AllgroupComponent,
  },
  {
    path: "add-group",
    component: AddgroupComponent,
  },
  {
    path: "edit-group/:id",
    component: EditgroupComponent,
  },
  {
    path: "group-profile",
    component: groupProfileComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class groupRoutingModule {}
