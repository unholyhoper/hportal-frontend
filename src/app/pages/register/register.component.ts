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
import { enumToArray , changeDropDown} from "src/app/shared-module/service";

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
  selectedFile: File;
  base64textString: string;
  constructor(private formBuilder: FormBuilder,    private regiterService: RegisterService,
    private router: Router,
    // private toast: ToastrService
    ) {
    let formControls = {
      username: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
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
      birthDate: [false, [Validators.required]],
      phone: new FormControl(null, [Validators.required]),
      country: ["", [Validators.required]],
      address: [
        "",
        [
          Validators.required,
          Validators.pattern("[A-Za-z .'-]+"),
          Validators.minLength(2),
        ],
      ],
      region: ["", [Validators.required]],
      profilePicture: ["", [Validators.required]],
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
    this.arrayOfCountry = enumToArray(Country);
    this.arrayOfRegion = enumToArray(Region);
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

  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          console.log(this.base64textString);
  }
  addPerson(registerForm) {
    console.log(this.register.value);
    console.log("Birth date : ",this.register.value.birthDate);

    let data = registerForm.value;
    data.profilePicture=this.base64textString
    let user = new RegisterUser(data.username,data.firstname,data.lastname,data.email,data.gender,data.country,data.region,data.password,data.role,data.medicalSerial,data.cin,data.address,data.privacyPolicy,data.phone,data.hospitalName,data.birthDate,data.profilePicture);
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
