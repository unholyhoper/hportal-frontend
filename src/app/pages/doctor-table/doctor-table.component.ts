import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterUser } from 'src/app/model/register-user';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-table',
  templateUrl: './doctor-table.component.html',
  styleUrls: ['./doctor-table.component.scss']
})
export class DoctorTableComponent implements OnInit {


  rows;
  headers;
  entity = 'Doctor'
  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
  public delete(source) {
    let index = this.rows.indexOf(source);
    console.log(index);

    this.rows.splice(index, 1);
    this.doctorService.deleteDoctor(source.id).subscribe(
      (res) => {
        this.showSuccessMessage(`The item is deleted successfuly`);
      },
      (err) => {
        this.showWarningMessage(`Error when deleting item `);
      }
    );
  }
  edit(id, item) {
    this.router.navigate([`doctorform/${item}/${id}`]);
  }
  add(item) {
    this.router.navigate([`doctorform/${item}`]);
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
