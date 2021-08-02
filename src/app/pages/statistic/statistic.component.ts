import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Chart from "chart.js";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";
import { Router } from "@angular/router";
import { Appointment } from "../../model/appointment";
import { AppointmentService } from "../../services/appointment.service";
import { ToastrService } from "ngx-toastr";
import { DiseaseService } from "src/app/services/disease.service";
import { UserService } from "src/app/services/user.service";
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

    name;
    role;
    roleIcon;
    numberOfDoctors ;
    numberOfPatients ;
    numberOfDelegates = 50;
    numberOfDisease = 100;
    private BookAppointmetForm: FormGroup;
    diseasesArray;
    emergencyArray: string[];
    //multiselect
    dropdownList: { item_id: number; item_text: string }[];
    selectedItems: { item_id: number; item_text: string }[];
    dropdownSettings: {
      singleSelection: boolean;
      idField: string;
      textField: string;
      selectAllText: string;
      unSelectAllText: string;
      itemsShowLimit: number;
      allowSearchFilter: boolean;
    };
    requiredField: boolean = false;
    roleName: string;
  
    constructor(
      private userService: UserService,
      private router: Router,
      private formBuilder: FormBuilder,
      private appointmentService: AppointmentService,
      private diseaseService: DiseaseService,
      private toastr: ToastrService
    ) {
      let formControls = {
        diseases: new FormControl("", []),
        date: ["", [Validators.required]],
        emergency: ["", [Validators.required]],
        description: ["", [Validators.required]],
        medicines: ["", [Validators.required]],
      };
      this.BookAppointmetForm = this.formBuilder.group(formControls);
    }
  
    get diseases() {
      return this.BookAppointmetForm.get("diseases");
    }
  
    get date() {
      return this.BookAppointmetForm.get("date");
    }
  
    get emergency() {
      return this.BookAppointmetForm.get("emergency");
    }
  
    get description() {
      return this.BookAppointmetForm.get("description");
    }
  doctors = new Array();
    ngOnInit() {

      this.userService.getAllDoctors().subscribe(
        res => {
          
          res.forEach(function (doc) {
            this.doctors.push({
              id: doc.id,
              username: doc.username,
              firstname: doc.firstname,
              lastname: doc.lastname,
              email: doc.email,
              enabled: doc.enabled
            });
            console.log('doctorsssss:', this.doctors);
  
  
          });
          this.showSuccessMessage(`Doctors loaded successfully`);
          this.doctorsList = this.doctors;
        },
        (err) => {
          this.showWarningMessage(`Error when loading doctors `);
        }
      );

      this.role = localStorage.getItem("role");
      this.name = localStorage.getItem("userName");
      this.diseaseService.getDiseaseName().subscribe(data =>{
        this.diseasesArray = data
      })
      this.emergencyArray = ["low", "medium", "high"];
      if (this.role === "ROLE_ADMIN") {
        this.roleIcon = "fas fa-user-shield";
        this.roleName = "Admin";
      } else if (this.role === "ROLE_DOCTOR") {
        this.roleIcon = "fas fa-user-md";
        this.roleName = "Doctor";
      } else if (this.role === "delegate") {
        this.roleIcon = "fas fa-briefcase-medical";
        this.roleName = "Delegate";
      } else if (this.role === "ROLE_USER") {
        this.roleIcon = "fas fa-user";
        this.roleName = "Patient";
      }
      this.dropdownList = [
        { item_id: 1, item_text: "Panadol" },
        { item_id: 2, item_text: "doliprane" },
        { item_id: 3, item_text: "smecta" },
        { item_id: 4, item_text: "alergica" },
        { item_id: 5, item_text: "deslore" },
        { item_id: 6, item_text: "analgon" },
      ];
  
      this.selectedItems = [];
  
      this.dropdownSettings = {
        singleSelection: false,
        idField: "item_id",
        textField: "item_text",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        itemsShowLimit: 3,
        allowSearchFilter: true,
      };
      this.setStatus();
    }
  
    changeDropDown(e, component) {
      component.setValue(e.target.value, {
        onlySelf: true,
      });
    }
  
    addAppointment(appointementForm) {
      console.log(appointementForm.value);
      //todo set the user value
      let appointment = new Appointment(
        null,
        null,
        new Date(appointementForm.value.date),
        appointementForm.value.emergency.toString().substr(3),
        "PENDING",
        null,
        appointementForm.value.description.toString()
      );
      console.log("Appintment :::::!", appointment);
      this.appointmentService.addAppointment(appointment).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  
    setStatus() {
      this.selectedItems.length > 0
        ? (this.requiredField = true)
        : (this.requiredField = false);
    }
  
    //multiselect
    onItemSelect(item: any) {
      this.setClass();
    }
  
    onSelectAll(items: any) {
      this.setClass();
    }
  
    setClass() {
      this.setStatus();
      if (this.selectedItems.length > 0) {
        return "validField";
      } else {
        return "invalidField";
      }
    }
  
    public management(source) {
      this.router.navigate([`${source}`]);
    }
  
    showNotification(type,message) {
      if (type === "default") {
        this.toastr.show(
          `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span><div class="alert-text"><span data-notify="message">${message}</span></div>`,
          "",
          {
            timeOut: 8000,
            closeButton: false,
            enableHtml: true,
            tapToDismiss: false,
            titleClass: "alert-title",
            toastClass:
              "alert alert-dismissible alert-default alert-notify animated fadeInDown",
          }
        );
      }
      if (type === "danger") {
        this.toastr.show(
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
              "ngx-toastr alert alert-dismissible alert-danger alert-notify",
          }
        );
      }
      if (type === "success") {
        this.toastr.show(
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
      if (type === "warning") {
        this.toastr.show(
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
      if (type === 'info') {
        this.toastr.show(
          `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"></div><span data-notify="message">${message}</span></div>`,
          '',
          {
            timeOut: 10000,
            closeButton: false,
            enableHtml: true,
            tapToDismiss: false,
            titleClass: 'alert-title',
            positionClass: 'toast-top-right',
            toastClass: "ngx-toastr alert alert-dismissible alert-info alert-notify",
          }
        );
      }
    }
    

    public chartType: string = 'bar';

    public chartDatasets: Array<any> = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Clients per doctor' }
    ];
  
    public chartLabels: Array<any> = [this.doctors[0], this.doctors[1], this.doctors[2], this.doctors[3],this.doctors[4], this.doctors[5]];
  
    public chartColors: Array<any> = [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      }
    ];
  
    public chartOptions: any = {
      responsive: true
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }

  }

