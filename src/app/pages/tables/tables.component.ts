import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MedecineService } from "../../services/medecine.service";
import { Medecine } from "../../model/Medecine";
import { CommonModule } from "@angular/common";
import { DoctorService } from "src/app/services/doctor.service";
import { RegisterUser } from "src/app/model/register-user";
import { PatientService } from "src/app/services/patient.service";
import { DiseaseService } from "src/app/services/disease.service";
import { MedicalRecordService } from "src/app/services/medical-record.service";
import { Disease } from "src/app/model/disease";
import { MaterialService } from "src/app/services/material.service";
import { MedicalRecord } from "src/app/model/medical-records";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements OnInit {
  public medecines: Medecine[];
  thead;
  entity: string;
  doctors: RegisterUser[];
  patient: RegisterUser[];
  disease: Disease[];
  service: string;
  rows;
  headers;
  constructor(
    private route: ActivatedRoute,
    private medecineService: MedecineService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private diseaseService: DiseaseService,
    private medicalRecordService: MedicalRecordService,
    private materialService: MaterialService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.entity = this.route.snapshot.paramMap.get("model");
    switch (this.entity) {
      case "medecines": {
        this.medecineService
          .allMedecines()
          .subscribe((medecineList: Medecine[]) => {
            this.rows = medecineList;
            console.log('rows',this.rows)
            this.headers = [
              { label: "ID", value: "id" },
              { label: "Reference", value: "reference" },
              { label: "Manufacturer", value: "manufacturer" },
              { label: "Quantity", value: "quantity" },
              { label: "Expiration date", value: "expirationDate" },
              { label: "Price", value: "price" },
            ];
          });

        
      }
      case "doctor": {
        this.doctorService.allDoctor().subscribe((doctor: RegisterUser[]) => {
          this.rows = doctor;
          this.headers = [
            { label: "FirstName", value: "firstName" },
            { label: "LastName", value: "lastName" },
            { label: "Serial Number", value: "serialNumber" },
            { label: "Gender", value: "gender" },
            { label: "Hosting Hospital", value: "hostingHospital" },
            { label: "Country", value: "country" },
          ];
        });
      }
      case "patients": {

        this.patientService
          .allPatient()
          .subscribe((patient: RegisterUser[]) => {
            this.rows = patient;
            this.headers = [
              { label: "FirstName", value: "firstName" },
              { label: "LastName", value: "lastName" },
              { label: "Serial Number", value: "serialNumber" },
              { label: "Gender", value: "gender" },
              { label: "Country", value: "country" },
            ];
          });
      }
      case "disease": {

        this.diseaseService.allDiseases().subscribe((disease: Disease[]) => {
          this.rows = disease;
          this.headers = [
            { label: "ID", value: "id" },
            { label: "Name", value: "name" },
            { label: "Description", value: "description" },
            { label: "Medecines", value: "medecines" },
          ];
        });
        break;
      }
      case "medicalRecords": {

        this.medicalRecordService
          .allMedicalRecord()
          .subscribe((medicalRecords: MedicalRecord[]) => {
            this.rows = medicalRecords;
            this.headers = [
              { label: "Patient First Name", value: "firstName" },
              { label: "Patient Last Name", value: "lastName" },
              { label: "Patient Diseases", value: "disease" },
              { label: "Patient Gender", value: "gender" },
            ];
          });
      }
      case "material": {

        this.materialService
          .allMaterial()
          .subscribe((patient: RegisterUser[]) => {
            this.rows = patient;
            this.headers = [
              { label: "Name", value: "name" },
              { label: "Quantity", value: "quantity" },
              { label: "Price", value: "price" },
            ];
          });
      }
      case "Another": {
        //statements;
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  public delete(source, entity) {
    let index = this.rows.indexOf(source);
    console.log(index)

    this.rows.splice(index, 1);
    switch (entity) {
      case "medecines": {
        this.medecineService.deleteMedecine(source.id).subscribe(res => {
          this.showSuccessMessage(`The item is deleted successfuly`)
        },
        err => {
          this.showWarningMessage(`Error when deleting item `)
        });
        break;
      }
      case "doctor": {
        this.doctorService.deleteDoctor(source.id).subscribe((res: any) => {
          console.log(res);
        });
        break;
      }
      case "patient": {
        this.patientService.deletePatient(source.id).subscribe((res: any) => {
          console.log(res);
        });
        break;
      }
      case "disease": {
        this.diseaseService.deleteMedecine(source.id).subscribe((res: any) => {
          console.log(res);
        });
        break;
      }
      case "medicalRecord": {
        this.medicalRecordService
          .deleteMedicalRecord(source.id)
          .subscribe((res: any) => {
            console.log(res);
          });
        break;
      }
      case "material": {
        this.materialService.deleteMaterial(source.id).subscribe((res: any) => {
          console.log(res);
        });
        break;
      }
    }
  }
  edit(id, screen) {
    this.router.navigate([`form/${screen}/${id}`]);
  }
  add(screen) {
    this.router.navigate([`form/${screen}`]);
  }
  showSuccessMessage(message) {
    this.toastrService.show(
      `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span data-notify="message">${message}</span></div>`,
      "",
      {
        timeOut: 10000,
        closeButton: false,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: "alert-title",
        positionClass: "toast-top-center",
        toastClass:
          "ngx-toastr alert alert-dismissible alert-success alert-notify",
      }
    );
  }
  showWarningMessage(message) {
    this.toastrService.show(
      `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"></div> <span data-notify="message">${message}</span></div>`,
      "",
      {
        timeOut: 10000,
        closeButton: false,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: "alert-title",
        positionClass: "toast-top-center",
        toastClass:
          "ngx-toastr alert alert-dismissible alert-warning alert-notify",
      }
    );
  }
}
