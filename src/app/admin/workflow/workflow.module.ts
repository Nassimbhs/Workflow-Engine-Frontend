import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddworkflowComponent } from "./addworkflow/addworkflow.component";
import { EditworkflowComponent } from "./editworkflow/editworkflow.component";
import { AppointmentService } from "./viewworkflow/appointment.service";
import { DeleteDialogComponent } from "./viewworkflow/dialogs/delete/delete.component";
import { FormDialogComponent } from "./viewworkflow/dialogs/form-dialog/form-dialog.component";
import { ViewworkflowComponent } from "./viewworkflow/viewworkflow.component";
import { AppointmentRoutingModule } from "./workflow-routing.module";

@NgModule({
  declarations: [
    AddworkflowComponent,
    EditworkflowComponent,
    ViewworkflowComponent,
    DeleteDialogComponent,
    FormDialogComponent,
  ],
  imports: [
    MatTooltipModule,
    NgxGraphModule,
    MatTabsModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    CommonModule,
    AppointmentRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
  ],
  providers: [AppointmentService],
})
export class AppointmentModule {}
