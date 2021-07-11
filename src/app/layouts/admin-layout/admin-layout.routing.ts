import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AppointmentComponent } from "../../appointment/appointment.component";
import { FormComponent } from "src/app/form/form.component";
import { FormappointmentComponent } from "../../formappointment/formappointment.component";
import { MedecinesTableComponent } from "src/app/pages/medecines-table/medecines-table.component";
import { MedecinesComponent } from "src/app/pages/medecines/medecines.component";
import { DiseasesComponent } from "src/app/pages/diseases/diseases.component";
import { DiseaseTableComponent } from "src/app/pages/disease-table/disease-table.component";
import { MedicalRecordsComponent } from "src/app/pages/medical-records/medical-records.component";
import { MedicalRecordTableComponent } from "src/app/pages/medical-record-table/medical-record-table.component";
import { PatientTableComponent } from "src/app/pages/patient-table/patient-table.component";
import { PatientsComponent } from "src/app/pages/patients/patients.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },

  { path: "medecineTable", component: MedecinesTableComponent },
  { path: "medecinesform/:entity/:id", component: MedecinesComponent },
  { path: "medecinesform/:entity", component: MedecinesComponent },

  { path: "diseaseTable", component: DiseaseTableComponent },
  { path: "diseaseform/:entity", component: DiseasesComponent },
  { path: "diseaseform/:entity/:id", component: DiseasesComponent },

  { path: "medicalRecordTable", component: MedicalRecordTableComponent },
  { path: "medicalRecordform/:entity", component: MedicalRecordsComponent },
  { path: "medicalRecordform/:entity/:id", component: MedicalRecordsComponent },
  
  { path: "patientTable", component: PatientTableComponent },
  { path: "patientform/:entity", component: PatientsComponent },
  { path: "patientform/:entity/:id", component: PatientsComponent },

  { path: "appointment", component: AppointmentComponent },
  { path: "appointmentForm/:id", component: FormappointmentComponent },
];
