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
  thead;
  theadList;
  entity: string;
  doctors: RegisterUser[];
  patient: RegisterUser[];
  disease: Disease[];
  list;
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
    private router: Router
  ) {}

  ngOnInit() {
    this.entity = this.route.snapshot.paramMap.get("model");
    switch (this.entity) {
      case "medecines": {
        this.medecineService
          .allMedecines()
          .subscribe((medecineList: Medecine[]) => {
            this.rows = medecineList;
          });

        this.headers = [
          { label: "ID", value: "id" },
          { label: "Reference", value: "reference" },
          { label: "Manufacturer", value: "manufacturer" },
          { label: "Quantity", value: "quantity" },
          { label: "Expiration date", value: "expirationDate" },
          { label: "Price", value: "price" },
        ];
      }
      case "doctor": {
        this.headers = [
          { label: "FirstName", value: "firstName" },
          { label: "LastName", value: "lastName" },
          { label: "Serial Number", value: "serialNumber" },
          { label: "Gender", value: "gender" },
          { label: "Hosting Hospital", value: "hostingHospital" },
          { label: "Country", value: "country" },
        ];
        this.doctorService.allDoctor().subscribe((doctor: RegisterUser[]) => {
          this.rows = doctor;
        });
      }
      case "patients": {
        this.headers = [
          { label: "FirstName", value: "firstName" },
          { label: "LastName", value: "lastName" },
          { label: "Serial Number", value: "serialNumber" },
          { label: "Gender", value: "gender" },
          { label: "Country", value: "country" },
        ];
        this.patientService
          .allPatient()
          .subscribe((patient: RegisterUser[]) => {
            this.rows = patient;
          });
      }
      case "diseases": {
        this.headers = [
          { label: "ID", value: "id" },
          { label: "Name", value: "name" },
          { label: "Description", value: "description" },
          { label: "Medecines", value: "medecines" },
        ];
        this.diseaseService.allDiseases().subscribe((disease: Disease[]) => {
          this.rows = disease;
        });
        break;
      }
      case "medicalRecords": {
        this.headers = [
          { label: "PatientFirstName", value: "firstName" },
          { label: "PatientLastName", value: "lastName" },
          { label: "PatientDiseases", value: "disease" },
          { label: "PatientGender", value: "gender" },
        ];
        this.medicalRecordService
          .allMedicalRecord()
          .subscribe((patient: RegisterUser[]) => {
            this.rows = patient;
          });
      }
      case "material": {
        this.headers = [
          { label: "Name", value: "name" },
          { label: "Quantity", value: "quantity" },
          { label: "Price", value: "price" },
        ];
        this.materialService
          .allMaterial()
          .subscribe((patient: RegisterUser[]) => {
            this.rows = patient;
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
      case "disease": {
        this.diseaseService.deleteMedecine(source.id).subscribe((res: any) => {
          console.log(res);
        });
        break;
      }
      case "medicalRecord": {
        this.medicalRecordService
          .deleteMedecine(source.id)
          .subscribe((res: any) => {
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
    console.log();
    this.router.navigate([`form/${screen}`]);
  }
}
