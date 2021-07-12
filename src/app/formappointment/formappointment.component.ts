import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {changeDropDown} from '../shared-module/service';
import {AppointmentService} from '../services/appointment.service';
import {Appointment} from '../model/appointment';
import {formatDate} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-formappointment',
  templateUrl: './formappointment.component.html',
  styleUrls: ['./formappointment.component.scss'],
})
export class FormappointmentComponent implements OnInit {
  statusArray: any;
  private appointementForm: FormGroup;
  formControls;
  status = 'PENDING';
  appointment;
  canassign;
  canReject;
  canCancel;
  role;
  canValidate;
  canReopen;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formControls = {
      doctor: new FormControl('', [
        Validators.required,
      ]),
      patient: new FormControl('', [
        Validators.required,
      ]),
      date: new FormControl('', [
        Validators.required,
      ]),
      priority: new FormControl('', [
        Validators.required,
      ]),
      status: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
    };
    this.appointementForm = this.formBuilder.group(this.formControls);
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');

    this.statusArray = ['PENDING', 'DONE', 'CANCELED', 'REOPENED', 'IN FORCE'];
    this.appointment = this.appointmentService
      .getAppointmentById(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        res => {
          res.date = formatDate(res.date, 'yyyy-MM-dd', 'en-US');
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
        },
        err => {
          console.log(err);
        }
      );
    this.canAssignToHimself(this.route.snapshot.paramMap.get('id'));
    console.log('can assign to himself ', this.canassign);
    this.canRejectAppointment();
    console.log('can reject appointment ', this.canReject);
    this.canValidateAppointment();
    this.canReoppentAppointment();
    this.canCancelAppointment();
    console.log('Can reject :', this.canReject);
  }

  submit() {
  }

  assignToMe() {
    this.appointmentService
      .assigntoCurrentUser(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        res => {
          console.log(res);

          window.location.reload();
        },
        err => {
          console.log(err);
        }
      );
  }

  canAssignToHimself(id) {
    this.appointmentService.canAssignToHimself(id).subscribe(
      res => {
        this.canassign = res.canAssign;
        console.log('can assign:::::::', res);
      },
      err => {
        this.canassign = false;
        console.log(err);
      }
    );
  }

  canRejectAppointment() {
    this.appointmentService
      .canRejectAppointment(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        res => {
          this.canReject = res.canReject;
        },
        err => {
          this.canReject = false;
          console.log(err);
        }
      );
  }

  cancelAppointment() {
    console.log('klik');
    this.appointmentService
      .cancelAppointmentCurrentUser(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        res => {
          console.log('appointment canceled', res);
          this.appointment.status = 'CANCELED';
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      );
  }

  rejectAppointment() {
    console.log('klik');
    this.appointmentService
      .rejectAppointment(this.appointment.id)
      .subscribe(
        res => {
          console.log('appointment canceled', res);
          this.appointment.status = 'REJECTED';
        },
        err => {
          console.log(err);
        }
      );
    window.location.reload();
  }

  validateAppointment() {
    console.log('validate');
    this.appointmentService
      .validateAppointment(this.appointment.id).subscribe(
      res => {
        this.appointment.status = 'VALIDATED';
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
    window.location.reload();
  }

  reopenAppointment() {
    console.log('validate');
    this.appointmentService
      .reopenAppointment(this.appointment.id).subscribe(
      res => {
        this.appointment.status = 'REOPENED';
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  addappointment(a) {
    this.router.navigate(['/appointment']);
  }

  canValidateAppointment() {
    this.appointmentService
      .canValidateAppointment(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        res => {
          this.canValidate = res.canValidate;
        },
        err => {
          this.canValidate = false;
          console.log(err);
        }
      );
  }

  canReoppentAppointment() {
    this.appointmentService
      .canRepoenAppointment(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        res => {
          this.canReopen = res.canReopen;
        },
        err => {
          this.canReopen = false;
          console.log(err);
        }
      );
    console.log('can reopen :', this.canReopen);
  }
  canCancelAppointment() {
    this.appointmentService
      .canRepoenAppointment(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        res => {
          this.canCancel = res.canCancel;
        },
        err => {
          this.canCancel = false;
          console.log(err);
        }
      );
    console.log('can canCancel :', this.canCancel);
  }
}
