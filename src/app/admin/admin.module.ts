import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AddworkflowComponent } from './workflow/addworkflow/addworkflow.component';
import { EditworkflowComponent } from './workflow/editworkflow/editworkflow.component';
import { ViewworkflowComponent } from "./workflow/viewworkflow/viewworkflow.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AddworkflowComponent,
    EditworkflowComponent,
    ViewworkflowComponent,
  ],
  imports: [CommonModule, AdminRoutingModule,MatSnackBarModule],
})
export class AdminModule {}
