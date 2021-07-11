import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { FormComponent } from 'src/app/form/form.component';
import { TablesComponent } from 'src/app/pages/tables/tables.component';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTESCLIENT: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: 'appointment', title: 'My appointments ',  icon: 'far fa-calendar-check text-primary', class: '' },
];
export const ROUTESADMIN: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard',  icon: 'ni ni-tv-2 text-primary', class: '' },
  { path: 'medecineTable', title: 'List of medecines',  icon:'fas fa-pills text-red', class: '' },
  { path: 'diseaseTable', title: 'List of diseases',  icon:'fas fa-diagnoses text-red', class: '' },
  { path: 'patientTable', title: 'List of Patients',  icon:'fas fa-users text-red', class: '' },
  { path: 'doctorTable', title: 'List of doctors',  icon:'fas fa-user-md text-red', class: '' },
  { path: 'materialTable', title: 'List of materials',  icon:'fas fa-bed text-red', class: '' },
  { path: 'delegateTable', title: 'List of delegates',  icon:'fas fa-briefcase-medical text-red', class: '' },

];

export const ROUTESDOCTOR: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard',  icon: 'ni ni-tv-2 text-primary', class: '',  },
  { path: 'appointment', title: 'Appointments',  icon: 'far fa-calendar-check text-primary', class: '' },
  { path: 'medecineTable', title: 'List of medecines',  icon:'fas fa-pills text-red', class: '' },
  { path: 'diseaseTable', title: 'List of diseases',  icon:'fas fa-diagnoses text-red', class: '' },
  { path: 'medicalRecordTable', title: 'List of medical records',  icon:'fas fa-notes-medical text-red', class: '' },
  { path: 'patientTable', title: 'List of Patients',  icon:'fas fa-users text-red', class: '' },

];



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  role: any;
  name: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.role = localStorage.getItem('role')
    this.name = localStorage.getItem('userName')
    switch(this.role){
      case('ROLE_ADMIN'):{
        this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);
        break;
      }
      case('ROLE_DOCTOR'):{
        this.menuItems = ROUTESDOCTOR.filter(menuItem => menuItem);
        break;
      }
      case('ROLE_USER'):{
        this.menuItems = ROUTESCLIENT.filter(menuItem => menuItem);
        break;
      }
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

}
