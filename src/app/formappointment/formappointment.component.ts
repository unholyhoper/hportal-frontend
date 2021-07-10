import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {changeDropDown} from '../shared-module/service';
import {AppointmentService} from '../services/appointment.service';
import {Appointment} from '../model/appointment';
import {formatDate} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-formappointment',
  templateUrl: './formappointment.component.html',
  styleUrls: ['./formappointment.component.scss']
})
export class FormappointmentComponent implements OnInit {
  statusArray: any;
  private appointementForm: FormGroup;
  formControls;
  status = 'PENDING';
  appointment;
  canassign;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private router: Router, private route: ActivatedRoute,
  ) {
    this.formControls = {
      doctor: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z .\'-]+'),
        Validators.minLength(2),
      ]),
      patient: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z .\'-]+'),
        Validators.minLength(2),
      ]),
      date: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z .\'-]+'),
        Validators.minLength(2),
      ]),
      priority: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z .\'-]+'),
        Validators.minLength(2),
      ]),
      status: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z .\'-]+'),
        Validators.minLength(2),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z .\'-]+'),
        Validators.minLength(2),
      ]),

    };
    this.appointementForm = this.formBuilder.group(this.formControls);


  }

  ngOnInit(): void {
    this.statusArray = ['PENDING', 'DONE', 'CANCELED', 'REOPENED', 'IN FORCE'];
    this.appointment = this.appointmentService.getAppointmentById(this.route.snapshot.paramMap.get('id')).subscribe(
      (res) => {
        console.log(res);
        res.date = formatDate(res.date, 'dd/MM/yyyy', 'en-US');
        console.log('update success');
        this.appointment = {
          id: res.id,
          date: res.date,
          description: res.description,
          doctor_firstName: res.doctor_firstName,
          doctor_lastName: res.doctor_lastName,
          patient_lastName: res.patient_lastName,
          priority: res.priority,
          status: res.status,
        };
        this.canAssignToHimself(7);
        console.log(this.appointment);

      },
      (err) => {
        console.log(err);
      }
    );
    this.canAssignToHimself(7);

  }

  submit() {
  }

  assignToMe() {
    this.appointmentService.assigntoCurrentUser(this.appointment.id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    window.location.reload();
  }

  canAssignToHimself(id) {
    this.appointmentService.canAssignToHimself(id).subscribe(
      (res) => {
        this.canassign = res.canAssign;
        console.log('can assign:::::::', res);
      },
      (err) => {
        this.canassign = false;
        console.log(err);
      }
    );

  }

  addappointment(a) {
    this.router.navigate(['/appointement']);


  }
}
