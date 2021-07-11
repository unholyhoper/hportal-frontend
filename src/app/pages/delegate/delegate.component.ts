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
  medecinesForm: FormGroup;
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
