import {Component, OnInit} from '@angular/core';
import {Appointment} from '../model/appointment';
import {AppointmentService} from '../services/appointment.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[];
  private edit: FormGroup;
  private formBuilder: FormBuilder;
  statusArray = ['PENDING', 'DONE', 'CANCELED', 'REOPENED', 'IN FORCE'];
  //todo set current user value
  currentUser: User;
  changedAppointment: Appointment;

  constructor(private appointmentService: AppointmentService, private userService: UserService) {
    // let formControls = {
    //   id: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('[A-Za-z .\'-]+'),
    //     Validators.minLength(2),
    //   ]),
    //   reference: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('[A-Za-z .\'-]+'),
    //     Validators.minLength(2),
    //   ]),
    //   quantity: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('[A-Za-z .\'-]+'),
    //     Validators.minLength(2),
    //   ]),
    //   expirationdate: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('[A-Za-z .\'-]+'),
    //     Validators.minLength(2),
    //   ]),
    //   price: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('[A-Za-z .\'-]+'),
    //     Validators.minLength(2),
    //   ]),
    // };
    // this.edit = this.formBuilder.group(formControls)
  }

  ngOnInit(): void {
    this.appointmentService.allAppointments().subscribe((res) => {
      this.appointments = res;
      console.log(this.appointments);
    });
    //mock static doctor from db
    this.userService.getUserById(34).subscribe((res) => {
      this.currentUser = res;
      console.log('current user :', this.currentUser);
    });
  }

  saveForm(form) {
    console.log(form.value);
  }

  public assignCurrentUser(appointmentId) {
    this.changedAppointment = this.appointments.filter(e => e.id == appointmentId)[0];
    this.changedAppointment.doctor = this.currentUser;
    this.appointmentService.updateAppointment(this.changedAppointment).subscribe(
      (res) => {
        console.log("update success")
      },
      (err) => {
        console.log(err);
      }
    );
    console.log('qsdf',changedAppointment);
  }
}