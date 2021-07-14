import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterUser } from 'src/app/model/register-user';
import { PatientService } from 'src/app/services/patient.service';
import {DoctorService} from '../../services/doctor.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.scss']
})
export class PatientTableComponent implements OnInit {

  rows;
  headers;
  entity = 'Doctor';
  doctorsList;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.headers = [
      {label: 'id', value: 'id'},
      {label: 'username', value: 'username'},
      {label: 'firstname', value: 'firstname'},
      {label: 'lastname', value: 'lastname'},
      {label: 'email', value: 'email'},
    ];
    console.log('headers :', this.headers);

    this.doctorService.allDoctor().subscribe((doctor: RegisterUser[]) => {
      this.rows = doctor;
    });
    this.userService.getAllUsers().subscribe(
      res => {
        let doctors = new Array();
        res.forEach(function (doc) {
          doctors.push({
            id: doc.id,
            username: doc.username,
            firstname: doc.firstname,
            lastname: doc.lastname,
            email: doc.email,
            enabled: doc.enabled
          });
          console.log('doctorsssss:', doctors);


        });
        this.showSuccessMessage(`Doctors loaded successfully`);
        this.doctorsList = doctors;
      },
      (err) => {
        this.showWarningMessage(`Error when loading doctors `);
      }
    );
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
      '',
      {
        timeOut: 10000,
        closeButton: false,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: 'alert-title',
        positionClass: 'toast-top-center',
        toastClass:
          'ngx-toastr alert alert-dismissible alert-success alert-notify',
      }
    );
  }

  showWarningMessage(message) {
    this.toastrService.show(
      `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"></div> <span data-notify="message">${message}</span></div>`,
      '',
      {
        timeOut: 10000,
        closeButton: false,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: 'alert-title',
        positionClass: 'toast-top-center',
        toastClass:
          'ngx-toastr alert alert-dismissible alert-warning alert-notify',
      }
    );
  }

  //
  // submitData() {
  //   this.doctorsList.forEach(function (doc) {
  //     this.userService.setEnabled(doc.id, {enabled: doc.enabled}).subscribe((res) => {
  //       console.log(res);
  //     });
  //   });
  //
  //
  // }
  toggleEnabled(id, flag) {
    this.userService.setEnabled(id, {'enabled': flag}).subscribe((res) => {
      console.log(res);
    });
  }
}
