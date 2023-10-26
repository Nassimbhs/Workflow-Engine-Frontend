import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonData } from "src/app/model/JsonData";
import { JsonService } from "src/app/service/json.service";
import { TokenStorageService } from "src/app/service/token-storage.service";


@Component({
  selector: "app-upcoming-appointment",
  templateUrl: "./upcoming-appointment.component.html",
  styleUrls: ["./upcoming-appointment.component.sass"]
})
export class UpcomingAppointmentComponent implements OnInit {

  jsonDataForm: FormGroup;
  currentUser: any;

  constructor(private formBuilder: FormBuilder, private jsonDataService: JsonService, private tokenStorage: TokenStorageService) {
    this.jsonDataForm = this.formBuilder.group({
      jsonData: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
  }

  jsonData: JsonData = new JsonData();
  addJsonData() {
    const responsable = this.currentUser.id;
    const jsonData = this.jsonDataForm.get('jsonData').value;
    this.jsonDataService.addJsonDataAndAssociateTaches(responsable, jsonData).subscribe(
      (response) => {
        console.log('Data added successfully', response);
      },
      (error) => {
        console.error('Error adding JSON data:', error);
      }
    );
  }


}