import { Region } from 'src/app/model/enum/region.enum';
import { Country } from 'src/app/model/enum/country.enum';
import { enumToArray } from 'src/app/shared-module/service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DelgateService } from '../../services/delgate.service';

@Component({
  selector: 'app-delegate',
  templateUrl: './delegate.component.html',
  styleUrls: ['./delegate.component.css']
})
export class DelegateComponent implements OnInit {

  formControls;
  delegateForm: FormGroup;
  isUpdate: any;
  entity = 'delegate'
  id: any;
  fields: any;

  constructor(
    private formBuilder: FormBuilder,
    private delegateService: DelgateService,
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
      /*laboratory: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      fieldOfTraining: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),*/
    };
    this.delegateForm = this.formBuilder.group(this.formControls);
    if (this.id !== undefined){
      this.isUpdate = true
    }
    else
      this.isUpdate = false
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
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
        label: "National ID Card",
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
      /*{
        label: "Laboratory",
        type: "text",
        formControleName: "laboratory",
        icon: "fas fa-flask",
        disable: "false",
      },
      {
        label: "Field of Training",
        type: "text",
        formControleName: "fieldOfTraining",
        icon: "fas fa-sign-language",
        disable: "false",
      },*/
    ];
      this.delegateService.getDelegate(this.id).subscribe(res => {
          this.fields.forEach(element => {
            element.value = res[element.formControleName]
          });

      });
  }
  editForm(form) {
    let data = form.value;
    if (this.isUpdate) {
      this.delegateService.updateDelegate(data).subscribe(
        (res) => {
          this.router.navigate([`/delegateTable`]);
        },
        (err) => {}
      );
    } else {
      this.delegateService.addDelegate(data).subscribe(
        (res) => {
          this.router.navigate([`/delegateTable`]);
        },
        (err) => {}
      );
    }
  }
  back() {
    this.router.navigate([`/medecineTable`]);
  }
}
