import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/jwt.service";

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
    private authService: AuthService,
    private router: Router,
    // private toast: ToastrService
  ) {}
  get cin() {
    return this.cin.get("cin");
  }
  get password() {
    return this.password.get("password");
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
    };
    this.loginForm = this.formBuilder.group(formControls);
  }
  ngOnDestroy() {}

  login(loginForm) {
    let data = loginForm.value;
    this.loginService.login(data.username,data.password)
  }
}
