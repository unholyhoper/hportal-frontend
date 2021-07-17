import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  private loginForm: FormGroup;
  role: any;
  constructor(
    private formBuilder: FormBuilder,
    private forgetPasswordService: ForgotPasswordService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  get username() {
    return this.username.get("username");
  }
  get actualPassword() {
    return this.actualPassword.get("actualPassword");
  }
  get newPassword() {
    return this.newPassword.get("newPassword");
  }
  get confirmNewPassword() {
    return this.confirmNewPassword.get("confirmNewPassword");
  }

  ngOnInit() {
    let formControls = {
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
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
      confirmNewPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),

    };
    this.loginForm = this.formBuilder.group(formControls);
  }
  ngOnDestroy() {}

  edit(loginForm) {
    let data = loginForm.value;
    this.forgetPasswordService.updatepassword(data).subscribe(
      (res) => {
        this.showSuccessMessage(res.message)      },
      (err) => {
          this.showWarningMessage(err.error.message)
      }
    );
  }
  forgotPassword() {
    this.router.navigate(["/forgotPassword"]);
  }
  showWarningMessage(message) {
    this.toastrService.show(
      `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"></div> <span data-notify="message">${message}</span></div>`,
      "",
      {
        timeOut: 10000,
        closeButton: false,
        enableHtml: true,
        tapToDismiss: true,
        titleClass: "alert-title",
        positionClass: "toast-top-center",
        toastClass:
          "ngx-toastr alert alert-dismissible alert-warning alert-notify",
      }
    );
  }
  showSuccessMessage(message) {
    this.toastrService.show(
      `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span data-notify="message">${message}</span></div>`,
      "",
      {
        timeOut: 10000,
        closeButton: false,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: "alert-title",
        positionClass: "toast-top-center",
        toastClass:
          "ngx-toastr alert alert-dismissible alert-success alert-notify",
      }
    );
  }
  
}
