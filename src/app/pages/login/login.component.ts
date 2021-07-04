import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    let formControls = {
      cin: new FormControl(null, [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
    }
    this.loginForm = this.formBuilder.group(formControls);
  }
  get cin(){return this.cin.get('cin')}
  get password(){return this.password.get('password')}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login(){
    console.log(this.loginForm.value)
  }

}
