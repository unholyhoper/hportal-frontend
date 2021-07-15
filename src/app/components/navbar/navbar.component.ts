import { Component, OnInit, ElementRef } from "@angular/core";
import {
  ROUTESADMIN,
  ROUTESCLIENT,
  ROUTESDOCTOR,
} from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  role: string;
  useName: string;
  notificationCount: number;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.useName = localStorage.getItem("userName");
    this.notificationCount = 1
    switch (this.role) {
      case "ROLE_ADMIN": {
        this.listTitles = ROUTESADMIN.filter((listTitle) => listTitle);
        break;
      }
      case "ROLE_DOCTOR": {
        this.listTitles = ROUTESDOCTOR.filter((listTitle) => listTitle);
        break;
      }
      case "ROLE_USER": {
        this.listTitles = ROUTESCLIENT.filter((listTitle) => listTitle);
        break;
      }
    }
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    return this.router.navigate(["/login"]);
  }
  updateNotification(){
    this.notificationCount = 0
  }
}
