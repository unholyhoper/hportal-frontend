import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  formControls;
  medecinesForm: FormGroup;
  isUpdate: any;
  entity = 'Doctor'
  id: any;
  fields: any;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
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
      this.doctorService.getdoctor(this.id).subscribe(res => {
          this.fields.forEach(element => {
            element.value = res[element.formControleName]
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
