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

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements OnInit {
  public medecines: Medecine[];
  private thead: String[];
  private theadList: String[];
  entity: string;
  doctors: RegisterUser[];
  patient: RegisterUser[];
  disease: Disease[];
  list;
  service: string;
  constructor(
    private route: ActivatedRoute,
    private medecineService: MedecineService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private diseaseService: DiseaseService,
    private medicalRecordService: MedicalRecordService,
    private materialService: MaterialService,
    private router: Router
  ) {}

  ngOnInit() {
    this.entity = this.route.snapshot.paramMap.get("model");
    switch (this.entity) {
      case "medecines": {
        this.theadList = [
          "ID",
          "Reference",
          "Manufacturer",
          "Quantity",
          "Expiration date",
          "Price",
        ];
        this.medecineService
          .allMedecines()
          .subscribe((medecineList: Medecine[]) => {
            this.list = medecineList;
          });
      }
      case "doctor": {
        this.theadList = [
          "FirstName",
          "LastName",
          "Serial Number",
          "gender",
          "Hosting Hospital",
          "country",
        ];
        this.doctorService.allDoctor().subscribe((doctor: RegisterUser[]) => {
          this.list = doctor;
        });
      }
      case "patient": {
        this.theadList = [
          "FirstName",
          "LastName",
          "Serial Number",
          "gender",
          "Hosting Hospital",
          "country",
        ];
        this.patientService
          .allPatient()
          .subscribe((patient: RegisterUser[]) => {
            this.list = patient;
          });
      }
      case "diseases": {
        this.theadList = ["ID", "Name", "Description", "Medecines"];
        this.diseaseService.allDiseases().subscribe((disease: Disease[]) => {
          this.list = disease;
        });
        break;
      }
      case "medicalRecord": {
        this.theadList = [
          "PatientFirstName",
          "PatientLastName",
          "PatientGender",
          "PatientDiseases",
        ];
        this.medicalRecordService
          .allMedicalRecord()
          .subscribe((patient: RegisterUser[]) => {
            this.patient = patient;
          });
      }
      case "material": {
        this.theadList = ["Name", "quantity", "price"];
        this.materialService
          .allMaterial()
          .subscribe((patient: RegisterUser[]) => {
            this.list = patient;
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
    let index = this.list.indexOf(source);
    this.list.splice(index, 1);
    switch (this.entity) {
      case "medecines": {
        this.medecineService.deleteMedecine(source.id).subscribe((res: any) => {
          console.log(res);
        });
        break;
      }
      case "doctor": {
        this.doctorService.deleteMedecine(source.id).subscribe((res: any) => {
          console.log(res);
        });
        break;
      }
      case "patient": {
        this.patientService.deleteMedecine(source.id).subscribe((res: any) => {
          console.log(res);
        });
        break;
      }
      case "diseases": {
        this.diseaseService.deleteMedecine(source.id).subscribe((res: any) => {
          console.log(res);
        });
        break;
      }
      case "medicalRecord": {
        this.medicalRecordService.deleteMedecine(source.id).subscribe((res: any) => {
          console.log(res);
        });
        break;
      }
      case "material": {
        this.materialService.deleteMedecine(source.id).subscribe((res: any) => {
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
    console.log()
    this.router.navigate([`form/${screen}`]);
  }
}
