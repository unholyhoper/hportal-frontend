import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  private ForgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private ForgotPasswordService: ForgotPasswordService, private router:Router) { 
      let formControls = {
        email: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
        ]),
        actualPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern("[A-Za-z .'-]+"),
          Validators.minLength(2),
        ]),
        newPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern("[A-Za-z .'-]+"),
          Validators.minLength(2),
        ]),
        ConfirmNewPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern("[A-Za-z .'-]+"),
          Validators.minLength(2),
        ]),
      };
      this.ForgotPasswordService = this.formBuilder.group(formControls);
    }

  ngOnInit(): void {
  }
  goToLogin(){
    this.router.navigate(['/login'])
  }
  goToRegister(){
    this.router.navigate(['/register'])
  }
}
