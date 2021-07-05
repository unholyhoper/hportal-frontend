import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginUser } from "src/app/model/login-user";
import { LoginService } from "src/app/services/login.service";

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
    private loginService: LoginService,
    private router: Router,
    // private toast: ToastrService
  ) {
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
    };
    this.loginForm = this.formBuilder.group(formControls);
  }
  get cin() {
    return this.cin.get("cin");
  }
  get password() {
    return this.password.get("password");
  }

  ngOnInit() {}
  ngOnDestroy() {}

  login(loginForm) {
    console.log(this.loginForm.value);
    let data = loginForm.value;
    let user = new LoginUser(data.cin,data.password);
    console.log(user)
    this.loginService.loginUser(user).subscribe(
      (res : any)=>{
        console.log(res)
        this.role = res.role;
        // this.toast.success('Identifié en tant que '+this.role,'Connexion réussi');
        let token = res.access_token;
        localStorage.setItem('myToken',token);
        this.router.navigate(['/dashboard']);
      },error => {
        console.log(error);
        // this.toast.error('Veuillez mentionner votre username et votre mot de passe','Username et/ou Mot de passe manquant');
      }
    )
  }
}
