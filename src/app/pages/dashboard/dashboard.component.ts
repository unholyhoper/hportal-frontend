import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Chart from "chart.js";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  name = "jessica";
  role = "client";
  roleIcon = "fas fa-user-shield";
  numberOfDoctors = 100;
  numberOfPatients = 300;
  numberOfDelegates = 50;
  numberOfDisease = 100;
  private BookAppointmetForm: FormGroup;
  diseasesArray: string[];
  emergencyArray: string[];
  //multiselect
  dropdownList: { item_id: number; item_text: string; }[];
  selectedItems: { item_id: number; item_text: string; }[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  requiredField: boolean = false;
  constructor(private formBuilder: FormBuilder) {
    let formControls = {
      diseases: new FormControl("", []),
      date:["",[Validators.required]],
      emergency:["",[Validators.required]],
      description:["",[Validators.required]],
      medicines:["",[Validators.required]],
    };
    this.BookAppointmetForm = this.formBuilder.group(formControls);
  }
  get diseases() {
    return this.BookAppointmetForm.get("diseases");
  }
  get date() {
    return this.BookAppointmetForm.get("date");
  }
  get emergency() {
    return this.BookAppointmetForm.get("emergency");
  }
  get description() {
    return this.BookAppointmetForm.get("description");
  }
  ngOnInit() {
    this.diseasesArray = ["corona-virus"];
    this.emergencyArray=["low","medium",'high']
    if (this.role === "admin") {
      this.roleIcon = "fas fa-user-shield";
    } else if (this.role === "doctor") {
      this.roleIcon = "fas fa-user-md";
    } else if (this.role === "delegate") {
      this.roleIcon = "fas fa-briefcase-medical";
    } else if (this.role === "client") {
      this.roleIcon = "fas fa-user";
    }
    this.dropdownList = [
      { "item_id": 1, "item_text": "Panadol" },
      { "item_id": 2, "item_text": "doliprane" },
      { "item_id": 3, "item_text": "smecta" },
      { "item_id": 4, "item_text": "alergica" },
      { "item_id": 5, "item_text": "deslore" },
      { "item_id": 6, "item_text": "analgon" }
    ];

    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.setStatus();
  }
  changeDropDown(e, component) {
    component.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  addAppointment(appointementForm) {
    console.log(appointementForm.value)
  }
  setStatus() {
    (this.selectedItems.length > 0) ? this.requiredField = true : this.requiredField = false;
  }

  //multiselect
  onItemSelect(item: any) {
    this.setClass();
  }
  onSelectAll(items: any) {
    this.setClass();
  }
  setClass() {
    this.setStatus();
    if (this.selectedItems.length > 0) { return 'validField' }
    else { return 'invalidField' }
  }
}
