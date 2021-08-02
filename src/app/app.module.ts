import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FormComponent } from './form/form.component';
import { JwtInterceptor } from './shared-module/auth.interceptor';
import {TablesComponent} from './pages/tables/tables.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { ToastContainerModule, ToastrModule } from "ngx-toastr";
import { FormappointmentComponent } from './formappointment/formappointment.component';
import { MedecinesComponent } from './pages/medecines/medecines.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { DiseasesComponent } from './pages/diseases/diseases.component';
import { MedecinesTableComponent } from './pages/medecines-table/medecines-table.component';
import { DiseaseTableComponent } from './pages/disease-table/disease-table.component';
import { MedicalRecordTableComponent } from './pages/medical-record-table/medical-record-table.component';
import { PatientTableComponent } from './pages/patient-table/patient-table.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { DoctorTableComponent } from './pages/doctor-table/doctor-table.component';
import { MaterialComponent } from './pages/material/material.component';
import { MaterialTableComponent } from './pages/material-table/material-table.component';
import { DelegateComponent } from './pages/delegate/delegate.component';
import { DelegateTableComponent } from './pages/delegate-table/delegate-table.component';
import { StatisticComponent } from './pages/statistic/statistic.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({closeButton : true,progressBar:true,positionClass:'toast-bottom-center'}),
  ],
  exports: [
    ToastrModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    FormComponent,
    TablesComponent,
    AppointmentComponent,
    FormappointmentComponent,
    MedecinesComponent,
    PatientsComponent,
    MedicalRecordsComponent,
    DiseasesComponent,
    MedecinesTableComponent,
    DiseaseTableComponent,
    MedicalRecordTableComponent,
    PatientTableComponent,
    DoctorsComponent,
    DoctorTableComponent,
    MaterialComponent,
    MaterialTableComponent,
    DelegateComponent,
    DelegateTableComponent,
    StatisticComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
