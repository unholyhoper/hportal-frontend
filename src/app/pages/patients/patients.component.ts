import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formControls = {
      id: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      reference: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      manufacturer: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      quantity: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      expirationdate: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      price: new FormControl("", [
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
      this.fields = [
        {
          label: 'Id',
          type: 'text',
          formControleName: 'id',
          icon: 'fa fa-user',
          disabled: true,
          value: this.id
        },
        {
          label: 'Reference',
          type: 'text',
          formControleName: 'reference',
          icon: 'fas fa-barcode',
        },
        {
          label: 'Manufacturer',
          type: 'text',
          formControleName: 'manufacturer',
          icon: 'fas fa-industry',
        },
        {
          label: 'Quantity',
          type: 'text',
          formControleName: 'quantity',
          icon: 'fas fa-cubes',
        },
        {
          label: 'Expiration date',
          type: 'text',
          formControleName: 'expirationdate',
          icon: 'fas fa-clock',
        },
        {
          label: 'Price',
          type: 'text',
          formControleName: 'price',
          icon: 'fas fa-dollar-sign',
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
    this.router.navigate([`/medecineTable`]);
  }
}
