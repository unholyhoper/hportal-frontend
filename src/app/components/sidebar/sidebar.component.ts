import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTESCLIENT: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
];
export const ROUTESADMIN: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
];
export const ROUTESDOCTOR: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/appointement', title: 'Appointments',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
]


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  role: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.role='doctor '
    switch(this.role){
      case('admin'):{
        this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);
        break;
      }
      case('doctor'):{
        this.menuItems = ROUTESDOCTOR.filter(menuItem => menuItem);
        break;
      }
      case('client'):{
        this.menuItems = ROUTESCLIENT.filter(menuItem => menuItem);
        break;
      }
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

}
