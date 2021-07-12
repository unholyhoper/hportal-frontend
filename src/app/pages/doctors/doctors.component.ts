import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Country } from "src/app/model/enum/country.enum";
import { Region } from "src/app/model/enum/region.enum";
import { DoctorService } from "src/app/services/doctor.service";
import { enumToArray } from "src/app/shared-module/service";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.css"],
})
export class DoctorsComponent implements OnInit {
  formControls;
  medecinesForm: FormGroup;
  isUpdate: any;
  entity = "Doctor";
  id: any;
  fields: any;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formControls = {
      firstname: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      lastname: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      gender: ["male", [Validators.required]],
      role: ["", [Validators.required]],
      medicalSerial: [null, [Validators.required, Validators.minLength(8)]],
      cin: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      password: [null, [Validators.required]],
      confirmPasword: [null, [Validators.required]],
      privacyPolicy: [false, [Validators.required]],
      phone: new FormControl(null, [Validators.required]),
      country: ["", [Validators.required]],
      adress: [
        "",
        [
          Validators.required,
          Validators.pattern("[A-Za-z .'-]+"),
          Validators.minLength(2),
        ],
      ],
      region: ["", [Validators.required]],
    };
    this.medecinesForm = this.formBuilder.group(this.formControls);
    if (this.id !== undefined) {
      this.isUpdate = true;
    } else this.isUpdate = false;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    let arrayOfCountry = enumToArray(Country);
    let arrayOfRegion = enumToArray(Region);
    this.fields = [
      {
        label: "First Name",
        type: "text",
        formControleName: "firstname",
        icon: "fa fa-user",
        disable: "false",
      },
      {
        label: "Last Name",
        type: "text",
        formControleName: "lastname",
        icon: "fa fa-user",
        disable: "false",
      },
      {
        label: "Gender",
        type: "radio",
        formControleName: "gender",
        value: ["male", "female"],
        icon: "",
        disable: "false",
      },
      {
        label: "Medical Serial",
        type: "text",
        formControleName: "medicalSerial",
        icon: "ni ni-badge",
        disable: "false",
      },
      {
        label: "Carte d'Identité National",
        type: "number",
        formControleName: "cin",
        icon: "fas fa-dollar-sign",
        disable: "false",
      },
      {
        label: "Phone number",
        type: "number",
        formControleName: "phone",
        icon: "fa fa-phone",
        disable: "false",
      },
      {
        label: "country",
        type: "dropdown",
        value: arrayOfCountry,
        formControleName: "country",
        icon: "",
        disable: "false",
      },
      {
        label: "Adress",
        type: "number",
        formControleName: "adress",
        icon: "",
        disable: "false",
      },
      {
        label: "region",
        type: "dropdown",
        formControleName: "region",
        value: arrayOfRegion,
        icon: "",
        disable: "false",
      },
    ];

    this.doctorService.getdoctor(this.id).subscribe((res) => {
      this.fields.forEach((element) => {
        element.value = res[element.formControleName];
      });
    });
  }
  editForm(form) {
    let data = form.value;
    if (this.isUpdate) {
      this.doctorService.updateDoctor(data).subscribe(
        (res) => {
          this.router.navigate([`/doctorTable`]);
        },
        (err) => {}
      );
    } else {
      this.doctorService.addDoctor(data).subscribe(
        (res) => {
          this.router.navigate([`/doctorTable`]);
        },
        (err) => {}
      );
    }
  }
  back() {
    this.router.navigate([`/medecineTable`]);
  }
}
