import {Component, OnInit} from '@angular/core';
import {Medecine} from '../model/medecine';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {RegisterUser} from '../model/register-user';
import {MedecineService} from '../services/medecine.service';
import {DoctorService} from '../services/doctor.service';
import {enumToArray} from '../shared-module/service';
import {Country} from '../model/enum/country.enum';
import {Region} from '../model/enum/region.enum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  fieldsCount: Number;
  fields;
  medecine;
  id: number;
  edited;
  editedList: String[];
  private edit: FormGroup;
  entity: string;
  isUpdate: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private medecineService: MedecineService,
    private doctorService: DoctorService
  ) {
    let formControls = {};
    let entity = this.route.snapshot.paramMap.get('entity');
    switch (entity) {
      case 'medecines': {
        formControls = {
          id: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          reference: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          manufacturer: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          quantity: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          expirationdate: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          price: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
        };
        break;
      }
      case 'doctor': {
        formControls = {
          firstname: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          lastname: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          email: new FormControl('', [
            Validators.required,
            Validators.pattern('^^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ]),
          gender: ['male', [Validators.required]],
          role: ['', [Validators.required]],
          medicalSerial: [null, [Validators.required, Validators.minLength(8)]],
          cin: [
            null,
            [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
          ],
          password: [null, [Validators.required]],
          confirmPasword: [null, [Validators.required]],
          privacyPolicy: [false, [Validators.required]],
          phone: new FormControl(null, [Validators.required]),
          country: ['', [Validators.required]],
          adress: [
            '',
            [
              Validators.required,
              Validators.pattern('[A-Za-z .\'-]+'),
              Validators.minLength(2),
            ],
          ],
          region: ['', [Validators.required]],
        };
        break;
      }
      case 'disease': {
        formControls = {
          id: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          reference: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          quantity: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          expirationdate: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
          price: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z .\'-]+'),
            Validators.minLength(2),
          ]),
        };
        break;
      }
    }
    this.edit = this.formBuilder.group(formControls);
  }

  ngOnInit(): void {
    this.entity = this.route.snapshot.paramMap.get('entity');
    const isNaN= Object.is(parseInt(this.route.snapshot.paramMap.get('id')), NaN)
    if (isNaN) {
      this.medecineService.medecineCount().subscribe(res => {
        this.id = res;
      });
    } else {
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    }
    switch (this.entity) {
      case 'medecines': {
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
        this.medecineService.getMedecine(this.id).subscribe(res => {
            this.fields.forEach(element => {
              element.value = res[element.formControleName]
            });  

        });
        break;
      }
      case 'doctor': {
        let arrayOfCountry = enumToArray(Country);
        let arrayOfRegion = enumToArray(Region);
        this.fields = [
          {
            label: 'First Name',
            type: 'text',
            formControleName: 'firstname',
            icon: 'fa fa-user',
            disable: 'false'
          },
          {
            label: 'Last Name',
            type: 'text',
            formControleName: 'lastname',
            icon: 'fa fa-user',
            disable: 'false'
          },
          {
            label: 'Gender',
            type: 'text',
            formControleName: 'gender',
            value: ['male', 'female'],
            icon: '',
            disable: 'false'
          },
          {
            label: 'Medical Serial',
            type: 'text',
            formControleName: 'medicalSerial',
            icon: 'ni ni-badge',
            disable: 'false'
          },
          {
            label: 'Carte d\'Identité National',
            type: 'number',
            formControleName: 'cin',
            icon: 'fas fa-dollar-sign',
            disable: 'false'
          },
          {
            label: 'Phone number',
            type: 'number',
            formControleName: 'phone',
            icon: 'fa fa-phone',
            disable: 'false'
          },
          {
            label: 'country',
            type: 'dropdown',
            value: arrayOfCountry,
            formControleName: 'country',
            icon: '',
            disable: 'false'
          },
          {
            label: 'Adress',
            type: 'number',
            formControleName: 'adress',
            icon: '',
            disable: 'false'
          },
          {
            label: 'region',
            type: 'dropdown',
            formControleName: 'region',
            value: arrayOfRegion,
            icon: '',
            disable: 'false'
          },
        ];
        this.doctorService.getdoctor(this.id).subscribe((res) => {

        });
        break;
      }
      default: {
        break;
      }
    }
    if(this.id !== undefined)
      this.isUpdate= true
    else
      this.isUpdate= false

  }

  editForm(form) {
    let data = form.value;
    if (this.isUpdate) {
      this.medecineService.updateMedecine(data).subscribe(
        (res) => {
          this.router.navigate([`/tables/medecines`]);
        },
        (err) => {
        }
      );
    } 
    else {
      this.medecineService.addMedecine(data).subscribe(
        (res) => {
          this.router.navigate([`/tables/medecines`]);
        },
        (err) => {
        }
      );
    }
  }
  back(source){
    this.router.navigate([`/tables/${source}`])
  }
}
