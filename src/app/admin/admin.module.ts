import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [
  ],
  imports: [CommonModule, AdminRoutingModule,MatSnackBarModule],
})
export class AdminModule {}
