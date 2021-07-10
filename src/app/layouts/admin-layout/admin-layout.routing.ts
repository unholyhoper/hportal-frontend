import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AppointmentComponent } from "../../appointment/appointment.component";
import { FormComponent } from "src/app/form/form.component";
import {FormappointmentComponent} from '../../formappointment/formappointment.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables/:model", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "form/:entity/:id", component: FormComponent },
  { path: "form/:entity", component: FormComponent },
  { path: "form/:entity/:id", component: FormComponent },
  {path: "appointments", component: AppointmentComponent},
  {path: "appointmentForm/:id",component: FormappointmentComponent},

];
