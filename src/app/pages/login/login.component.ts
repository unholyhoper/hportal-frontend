import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/jwt.service";
import { ToastContainerDirective, ToastrService } from "ngx-toastr";
import jwt_decode from "jwt-decode";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginForm: FormGroup;
  role: any;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }

  ngOnInit() {
    let formControls = {
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      rememberMe: new FormControl(null, []),
    };
    this.loginForm = this.formBuilder.group(formControls);
  }
  ngOnDestroy() {}

  login(loginForm) {
    let data = loginForm.value;
    if(data.rememberMe === true){
      localStorage.setItem('username',data.username)
      localStorage.setItem('password',data.password)
    }
    if(data.username === '')
      data.username=null
    if(data.password === '')
      data.password=null
   
    this.loginService.login(data.username, data.password).subscribe(
      (response) => {
        console.log(response);
        // login successful if there's a jwt token in the response
        if (response) {
          localStorage.setItem("jwt", JSON.stringify(response));
          const token_decode = jwt_decode(JSON.stringify(response));
          localStorage.setItem("userName", token_decode["username"]);
          localStorage.setItem("role", token_decode["roles"][0]);
          this.router.navigate(["/dashboard"]);
          // success toast
          this.toastrService.show(
            `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"></div> <span data-notify="message"> Welcome ! </span></div>`,
            "",
            {
              timeOut: 5000,
              closeButton: false,
              enableHtml: true,
              tapToDismiss: true,
              positionClass: "top-right",
              toastClass:
                "ngx-toastr alert alert-dismissible alert-success alert-notify",
            }
          );
        }
      },
      (err) => {
        if (
          (data.username === null || data.username === undefined) &&
          (data.password === null || data.password === undefined)
        ) {
          this.showWarningMessage("User and Password are missing");
        } else {
          if (data.username === null || data.username === undefined) {
            this.showWarningMessage("You missed to define the user");
          }
          else if (data.password === null || data.password === undefined) {
            this.showWarningMessage("You missed to define the password");
          }
          else{
            this.toastrService.show(
              `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"></div> <span data-notify="message"> User or password incorrect</span></div>`,
              "",
              {
                timeOut: 5000,
                closeButton: false,
                enableHtml: true,
                tapToDismiss: true,
                positionClass: "top-right",
                toastClass:
                  "ngx-toastr alert alert-dismissible alert-danger alert-notify",
              }
            );
          }
        }
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
}
