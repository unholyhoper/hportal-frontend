import {Component, OnInit} from '@angular/core';
import {Appointment} from '../model/appointment';
import {AppointmentService} from '../services/appointment.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[];
  private edit: FormGroup;
  private formBuilder: FormBuilder;
  statusArray = [ 'PENDING' , 'DONE','CANCELED','REOPENED','IN FORCE']
  constructor(private appointmentService: AppointmentService) {
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
  }

  saveForm(form) {
    console.log(form.value);
  }
}
