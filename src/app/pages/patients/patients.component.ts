import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/model/enum/country.enum';
import { PatientService } from 'src/app/services/patient.service';
import { enumToArray } from 'src/app/shared-module/service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  formControls;
  medecinesForm: FormGroup;
  isUpdate: any;
  entity = 'Patient'
  id: any;
  fields: any;
  arrayOfCountry: any;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
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
      gender: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      cin: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      country: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
    };
    this.medecinesForm = this.formBuilder.group(this.formControls);
    if (this.id !== undefined){
      this.isUpdate = true
    }
    else
      this.isUpdate = false
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
    this.arrayOfCountry = enumToArray(Country);
      this.fields = [
        {
          label: 'Firstname',
          type: 'text',
          formControleName: 'firstname',
          icon: 'fa fa-user',
        },
        {
          label: 'Lastname',
          type: 'text',
          formControleName: 'lastname',
          icon: 'fa fa-user',
        },
        {
          label: 'Gender',
          type: 'radio',
          formControleName: 'gender',
          icon: 'fas fa-venus-mars',
        },
        {
          label: 'CIN',
          type: 'number',
          formControleName: 'cin',
          icon: 'fas fa-cubes',
        },
        {
          label: 'Phone',
          type: 'number',
          formControleName: 'phone',
          icon: 'fas fa-clock',
        },
        {
          label: 'Country',
          type: 'dropdown',
          formControleName: 'country',
          icon: 'fas fa-dollar-sign',
          value: this.arrayOfCountry
        },
      ];
      this.patientService.getPatient(this.id).subscribe(res => {
          this.fields.forEach(element => {
            element.value = res[element.formControleName]
          });  

      });
  }
  editForm(form) {
    let data = form.value;
    if (this.isUpdate) {
      this.patientService.updatePatient(data).subscribe(
        (res) => {
          this.router.navigate([`/patientTable`]);
        },
        (err) => {}
      );
    } else {
      this.patientService.addPatient(data).subscribe(
        (res) => {
          this.router.navigate([`/patientTable`]);
        },
        (err) => {}
      );
    }
  }
  back() {
    this.router.navigate([`/patientTable`]);
  }
}
