import { NgbdModalContent } from './../../shared-module/components/modal-component';
import { UserService } from './../../services/user.service';
import { Role } from './../../shared-module/models/role.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  role : any;
  user : any;
  currentUser : any;
  event : Event;
  allUsers : any[];
  shownRole : string;
  documentReady = false;
  userLastName : string;
  userCountry : string;
  userMedicalSerial: string;
  userId : number;
  userName : string;
  initUser : any;

  isEditModeEnabled = false;
  profileForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService : UserService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {
    this.profileForm = this.formBuilder.group({
      /*userName: new FormControl("", [
        Validators.required,
        Validators.pattern('[A-Za-z .\'-]+'),
        Validators.minLength(2),
      ]),*/
      firstname: new FormControl("", [
        Validators.required,
        Validators.pattern('[A-Za-z .\'-]+'),
        Validators.minLength(2),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z .\'-]+'),
        Validators.minLength(2),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      medicalSerial: [null, [Validators.required, Validators.minLength(8)]],
      cin: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      phone: new FormControl(null, [Validators.required]),
      country: ['', [Validators.required]],
      adress: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-z .\'-]+'),
          Validators.minLength(2),
        ],
      ],
    });
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(resOne => {
      this.currentUser = resOne;
    });
    this.initUser = JSON.parse(sessionStorage.getItem('zeroUser'));
     this.userService.getAllUsers().subscribe((resAll) => {
       resAll.forEach(element => {
         if (element.id === this.currentUser.id){
           this.role = element.roles[0] ? element.roles[0] : (this.initUser ? this.initUser.roles : "ROLES_USER");
           this.currentUser.user_firstName = this.currentUser.user_firstName ? element.user_firstName : this.initUser.first_name;
           this.userLastName = element.last_name ? element.last_name : (this.initUser ? this.initUser.last_name : "last_name");
           this.currentUser.email = this.currentUser.email ? element.email : this.initUser.email;
           this.currentUser.cin = this.currentUser.cin ? element.cin : this.initUser.cin;
           this.currentUser.address = this.currentUser.address ? element.address : this.initUser.address;
           this.currentUser.phone = this.currentUser.phone ? element.phone : this.initUser.phone;
           this.userName = element.username || this.initUser.username;
           this.userMedicalSerial = element.medical_serial || this.initUser.medical_serial;
           this.userId = element.id;
         }
       });
       if (localStorage.getItem('role')){
         this.documentReady = true;
       }
       localStorage.setItem('userID', JSON.stringify(this.userId));
       this.changeShowcase();
       this.checkFromControls();
     });
  }

  saveProfile(event){
    if (this.isEditModeEnabled) {
      this.user = {
        //userName : this.profileForm.get('userName').value,
        address: this.profileForm.get('adress').value,
        cin: this.profileForm.get('cin').value,
        phone: this.profileForm.get('phone').value,
        first_name : this.profileForm.get('firstname').value,
        last_name : this.profileForm.get('lastname').value,
        email: this.profileForm.get('email').value,
        medical_serial : this.profileForm.get('medicalSerial').value,
        role : localStorage.getItem('role') == 'ROLE_DOCTOR'
      }
      let currentId = JSON.parse(localStorage.getItem('userID'));
      this.userService.updateCurrentUser(currentId).subscribe(
        (res) => {
           res = this.user;
           sessionStorage.setItem('zeroUser', JSON.stringify(res));
        },
      );
      this.modalService.open(NgbdModalContent);
    }
  }

  changeShowcase() {
    let backgroundPic = document.getElementById("userProfileHeader")
        if (this.role === "ROLE_ADMIN"){
        backgroundPic.style.backgroundImage = 'url(assets/img/theme/admin.jpg)';
        this.shownRole = "Administrator";
      }
      if (this.role === "ROLE_DOCTOR"){
        backgroundPic.style.backgroundImage = 'url(assets/img/theme/medic.jpg)';
        this.shownRole = "Doctor";
      }
      if (this.role === "ROLE_USER"){
        backgroundPic.style.backgroundImage = 'url(assets/img/theme/profile-cover.jpg)';
        this.shownRole = "Patient";
      }
  }

  checkFromControls(){
    this.profileForm.get('firstname').setValue(this.currentUser.user_firstName);
    this.isEditModeEnabled == true ? this.profileForm.get('firstname').enable() : this.profileForm.get('firstname').disable() ;

    this.profileForm.get('lastname').setValue(this.userLastName);
    this.isEditModeEnabled == true ? this.profileForm.get('lastname').enable() : this.profileForm.get('lastname').disable() ;

    this.profileForm.get('email').setValue(this.currentUser.email);
    this.isEditModeEnabled == true ? this.profileForm.get('email').enable() : this.profileForm.get('email').disable() ;

    this.profileForm.get('medicalSerial').setValue(this.userMedicalSerial);
    this.isEditModeEnabled == true ? this.profileForm.get('medicalSerial').enable() : this.profileForm.get('medicalSerial').disable() ;

    this.profileForm.get('cin').setValue(this.currentUser.cin);
    this.isEditModeEnabled == true ? this.profileForm.get('cin').enable() : this.profileForm.get('cin').disable() ;

    this.profileForm.get('phone').setValue(this.currentUser.phone);
    this.isEditModeEnabled == true ? this.profileForm.get('phone').enable() : this.profileForm.get('phone').disable() ;

    this.profileForm.get('country').setValue(this.userCountry);
    this.isEditModeEnabled == true ? this.profileForm.get('country').enable() : this.profileForm.get('country').disable() ;

    this.profileForm.get('adress').setValue(this.currentUser.address);
    this.isEditModeEnabled == true ? this.profileForm.get('adress').enable() : this.profileForm.get('firstname').disable() ;

    /*this.profileForm.get('userName').setValue(this.userName);
    this.isEditModeEnabled == true ? this.profileForm.get('userName').enable() : this.profileForm.get('userName').disable() ;*/
  }

  isEditClicked($event){
    this.isEditModeEnabled = true;
    this.checkFromControls();
  }


}
