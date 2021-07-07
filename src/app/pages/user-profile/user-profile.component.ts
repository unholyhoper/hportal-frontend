import { Role } from './../../shared-module/models/role.model';
import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/model/register-user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  role : Role;
  user : RegisterUser;

  medicalUser = {
    firstname: "medic",
    lastname: "benMedic",
    email: "medic@mail.com",
    gender: "male",
    country: "Tunisia",
    region: "Tunis",
    password: "passwd",
    role: "Doctor",
    medicalSerial: 2992755,
    cin: 558996332,
    adress: "address",
    privacyPolicy: true,
    phone: 36517965,
    hospitalName : "Fattouma Bourgiba Hospital"
  }

  medicalPatient = {
    firstname: "patient",
    lastname: "benpatient",
    email: "patient@mail.com",
    gender: "male",
    country: "Tunisia",
    region: "Tunis",
    password: "passwd",
    cin: 558996332,
    adress: "address",
    privacyPolicy: true,
    phone: 36517965,
    hospitalName : "Fattouma Bourgiba Hospital"
  }

  medicalAdmin = {
    firstname: "delegate",
    lastname: "bendelegate",
    email: "delegate@mail.com",
    gender: "male",
    country: "Tunisia",
    region: "Tunis",
    password: "passwd",
    role: "Doctor",
    cin: 558996332,
    adress: "address",
    privacyPolicy: true,
    phone: 36517965,
    hospitalName : "Fattouma Bourgiba Hospital"
  }

  isEditModeEnabled = false;

  constructor(
    //inject dependencies
  ) {}

  ngOnInit() {
    this.role = {
      id : 'lorem',
      name : 'doctor',
      description : 'gay and proud fucker'
    }
    this.changeBackgroundPic();
  }
  editProfile(){
    //Todo: imp fonc logic
  }

  saveProfile(){
    //Todo: imp fonc logic
  }

  changeBackgroundPic() {
    let backgroundPic = document.getElementById("userProfileHeader")
        if (this.role.name === "admin"){
        backgroundPic.style.backgroundImage = 'url(assets/img/theme/admin.jpg)'
      }
      if (this.role.name === "doctor"){
        backgroundPic.style.backgroundImage = 'url(assets/img/theme/medic.jpg)'
      }
      if (this.role.name === "client"){
        backgroundPic.style.backgroundImage = 'url(assets/img/theme/profile-cover.jpg)'
      }
  }

}
