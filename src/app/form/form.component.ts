import { RegisterService } from './../services/register.service';
import {Component, OnInit} from '@angular/core';
import {Medecine} from '../model/medecine';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterUser} from '../model/register-user';
import {MedecineService} from '../services/medecine.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  fieldsCount: Number;
  fields: String[];
  medecine: Medecine;
  id: number;
  edited;
  editedList: String[];
  private edit: FormGroup;
  router : Router;


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private medecineService: MedecineService,
    private regiterService: RegisterService) {
    let formControls = {
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z .\'-]+'),
        Validators.minLength(2),
      ])
    };
    this.edit = this.formBuilder.group(formControls);
  }

  ngOnInit(): void {
    let entity = this.route.snapshot.paramMap.get('entity');
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(entity);
    console.log(this.id);
    if (entity === 'medecine') {
      this.fields = ['id', 'reference', 'quantity', 'expiration date', 'price'];


      switch (entity) {
        case 'medecine': {
          this.medecineService.getMedecine(this.id).subscribe(
            (res: any) => {
              console.log(res);
              this.medecine = res.medecine;
              console.log(this.editedList);
            });
          this.editedList = [this.medecine.id.toString(), this.medecine.reference.toString(), this.medecine.manufacturer.toString(),
            this.medecine.quantity.toString(), this.medecine.expirationDate.toString(), this.medecine.price.toString()];

          break;
        }

        default: {
          break;
        }
      }

    }
  }

  addPerson(registerForm) {
    let data = registerForm.value;
    let user = new RegisterUser(data.firstname, data.lastname, data.email, data.gender, data.country, data.region, data.password, data.role, data.medicalSerial, data.cin, data.adress, data.privacyPolicy, data.phone, data.hospitalName);


    this.regiterService.addUser(user).subscribe(
      res => {
        // this.toastr.success(res.message);
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
