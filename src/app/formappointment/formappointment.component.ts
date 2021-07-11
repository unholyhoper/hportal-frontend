import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { changeDropDown } from "../shared-module/service";
import { AppointmentService } from "../services/appointment.service";
import { Appointment } from "../model/appointment";
import { formatDate } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-formappointment",
  templateUrl: "./formappointment.component.html",
  styleUrls: ["./formappointment.component.scss"],
})
export class FormappointmentComponent implements OnInit {
  statusArray: any;
  private appointementForm: FormGroup;
  formControls;
  status = "PENDING";
  appointment;
  canassign;
  canReject;
  role;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formControls = {
      doctor: new FormControl("", [
        Validators.required,
      ]),
      patient: new FormControl("", [
        Validators.required,
      ]),
      date: new FormControl("", [
        Validators.required,
      ]),
      priority: new FormControl("", [
        Validators.required,
      ]),
      status: new FormControl("", [
        Validators.required,
      ]),
      description: new FormControl("", [
        Validators.required,
      ]),
    };
    this.appointementForm = this.formBuilder.group(this.formControls);
  }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    
    this.statusArray = ["PENDING", "DONE", "CANCELED", "REOPENED", "IN FORCE"];
    this.appointment = this.appointmentService
      .getAppointmentById(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        res => {
          res.date = formatDate(res.date, "dd/MM/yyyy", "en-US");
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
    this.canAssignToHimself(this.route.snapshot.paramMap.get("id"));
    console.log("can assign to himself ", this.canassign);
    this.canRejectAppointment();
    console.log("can reject appointment ", this.canReject);
  }

  submit() {}

  assignToMe() {
    this.appointmentService
      .assigntoCurrentUser(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    window.location.reload();
  }

  canAssignToHimself(id) {
    this.appointmentService.canAssignToHimself(id).subscribe(
      res => {
        this.canassign = res.canAssign;
        console.log("can assign:::::::", res);
      },
      err => {
        this.canassign = false;
        console.log(err);
      }
    );
  }

  canRejectAppointment() {
    this.appointmentService
      .canRejectAppointment(this.route.snapshot.paramMap.get("id"))
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
    console.log("klik");
    this.appointmentService
      .cancelAppointmentCurrentUser(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        res => {
          console.log("appointment canceled", res);
          this.appointment.status = "CANCELED";
        },
        err => {
          console.log(err);
        }
      );
    window.location.reload();
  }

  rejectAppointment() {
    console.log("klik");
    this.appointmentService
      .cancelAppointmentCurrentUser(this.appointment.id)
      .subscribe(
        res => {
          console.log("appointment canceled", res);
          this.appointment.status = "CANCELED";
        },
        err => {
          console.log(err);
        }
      );
    window.location.reload();
  }

  addappointment(a) {
    this.router.navigate(["/appointment"]);
  }
}
