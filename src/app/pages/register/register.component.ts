import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Country } from "src/app/model/enum/country.enum";
import { Region } from "src/app/model/enum/region.enum";
import { RegisterUser } from "src/app/model/register-user";
import { RegisterService } from "src/app/services/register.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  private register: FormGroup;
  roles: any = ["Doctor", "Client", "Delegate"];
  pwdstrength = "You should add your password";
  pwdstrengthColor = "text-danger";
  pswdMatch = "Not matching";
  pswdMatchColor: string;
  countries = Country;
  arrayOfRegion;
  arrayOfCountry;
  constructor(private formBuilder: FormBuilder,    private regiterService: RegisterService,
    private router: Router,
    // private toast: ToastrService
    ) {
    let formControls = {
      firstname: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      lastname: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      gender: ["male", [Validators.required]],
      role: ["", [Validators.required]],
      medicalSerial: [null, [Validators.required, Validators.minLength(8)]],
      cin: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      password: [null, [Validators.required]],
      confirmPasword: [null, [Validators.required]],
      privacyPolicy: [false, [Validators.required]],
      phone: new FormControl(null, [Validators.required]),
      country: ["", [Validators.required]],
      adress: [
        "",
        [
          Validators.required,
          Validators.pattern("[A-Za-z .'-]+"),
          Validators.minLength(2),
        ],
      ],
      region: ["", [Validators.required]],
    };
    this.register = this.formBuilder.group(formControls);
  }
  get firstname() {
    return this.register.get("firstname");
  }
  get lastname() {
    return this.register.get("lastname");
  }
  get email() {
    return this.register.get("email");
  }
  get gender() {
    return this.register.get("gender");
  }
  get role() {
    return this.register.get("role");
  }
  get medicalSerial() {
    return this.register.get("medicalSerial");
  }
  get cin() {
    return this.register.get("cin");
  }
  get phone() {
    return this.register.get("phone");
  }
  get country() {
    return this.country.get("country");
  }
  get password() {
    return this.register.get("password");
  }
  get privacyPolicy() {
    return this.privacyPolicy.get("password");
  }
  get adress() {
    return this.adress.get("adress");
  }
  get region() {
    return this.region.get("region");
  }

  ngOnInit() {
    this.arrayOfCountry = this.enumToArray(Country);
    this.arrayOfRegion = this.enumToArray(Region);
    console.log(this.arrayOfRegion);
    console.log(this.arrayOfCountry);
  }

  enumToArray(enumValue: any) {
    let arrayObjects = [];
    for (const [propertyKey, propertyValue] of Object.entries(enumValue)) {
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      arrayObjects.push({ id: propertyValue, name: propertyKey });
    }
    return arrayObjects;
  }
  changeDropDown(e, component) {
    component.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  verifPassword(e) {
    if (e.length > 0 && e.length < 5) {
      this.pwdstrength = "Low";
      this.pwdstrengthColor = "text-warning";
    } else if (e.length >= 5 && e.length < 10) {
      this.pwdstrength = "Medium";
      this.pwdstrengthColor = "text-warning";
    } else if (e.length >= 10) {
      this.pwdstrength = "Strong";
      this.pwdstrengthColor = "text-success";
    } else {
      this.pwdstrength = "You should add your password";
      this.pwdstrengthColor = "text-danger";
    }
  }
  confirmPassword(pswd) {
    console.log(this.password);
    if (pswd === this.password.value) {
      this.pswdMatch = " matching";
      this.pswdMatchColor = "text-success";
    } else {
      this.pswdMatch = "not matching";
      this.pswdMatchColor = "text-danger";
    }
  }
  addPerson(registerForm) {
    console.log(this.register.value);
    let data = this.register.value;
    let user = new RegisterUser(data.firstname,data.lastname,data.email,data.gender,data.country,data.region,data.password,data.role,data.medicalSerial,data.cin,data.adress,data.privacyPolicy,data.phone);
    this.regiterService.addUser(user).subscribe(
      res=>{
        // this.toastr.success(res.message);
        this.router.navigate(['/login']);
      },
      err=>{
        console.log(err);
      }
    )
  }
}
