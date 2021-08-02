import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterUser } from 'src/app/model/register-user';
import { DelgateService } from 'src/app/services/delgate.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delegate-table',
  templateUrl: './delegate-table.component.html',
  styleUrls: ['./delegate-table.component.scss']
})
export class DelegateTableComponent implements OnInit {

  rows;
  headers;
  entity = 'Delegate'
  delegateList;
  constructor(
    private route: ActivatedRoute,
    private delagateService: DelgateService,
    private userService : UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.headers = [
      {label: 'id', value: 'id'},
      {label: 'username', value: 'username'},
      {label: 'firstname', value: 'firstname'},
      {label: 'lastname', value: 'lastname'},
      {label: 'email', value: 'email'},
    ];
    this.delagateService.allDelegates().subscribe((delegate : RegisterUser[]) => {
      this.rows = delegate;
    });
    this.userService.getAllDelegates().subscribe(
      res => {
        let delegates = new Array();
        res.forEach(function (del) {
          delegates.push({
            username: del.username,
            firstname: del.firstname,
            lastname: del.lastname,
            email: del.email,
            enabled: del.enabled
          });
          console.log('delegatesssss:', delegates);


        });
        this.showSuccessMessage(`Delegates loaded successfully`);
        this.delegateList = delegates;
      },
      (err) => {
        this.showWarningMessage(`Error when loading delegates`);
      }
    );
  }
  public delete(source) {
    let index = this.rows.indexOf(source);
    console.log(index);

    this.rows.splice(index, 1);
    this.delagateService.deleteDelegate(source.id).subscribe(
      (res) => {
        this.showSuccessMessage(`The item is deleted successfuly`);
      },
      (err) => {
        this.showWarningMessage(`Error when deleting item `);
      }
    );
  }
  edit(id, item) {
    this.router.navigate([`delegateform/${item}/${id}`]);
  }
  add(item) {
    this.router.navigate([`delegateform/${item}`]);
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
  showWarningMessage(message) {
    this.toastrService.show(
      `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"></div> <span data-notify="message">${message}</span></div>`,
      "",
      {
        timeOut: 10000,
        closeButton: false,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: "alert-title",
        positionClass: "toast-top-center",
        toastClass:
          "ngx-toastr alert alert-dismissible alert-warning alert-notify",
      }
    );
  }
  submitData(){
    console.log("data submitted");
  }
}
