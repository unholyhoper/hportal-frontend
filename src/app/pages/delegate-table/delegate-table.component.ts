import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterUser } from 'src/app/model/register-user';
import { DelgateService } from 'src/app/services/delgate.service';

@Component({
  selector: 'app-delegate-table',
  templateUrl: './delegate-table.component.html',
  styleUrls: ['./delegate-table.component.scss']
})
export class DelegateTableComponent implements OnInit {

  rows;
  headers;
  entity = 'Delegate'
  constructor(
    private route: ActivatedRoute,
    private delagateService: DelgateService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.delagateService.allDiseases().subscribe((disease: RegisterUser[]) => {
      this.rows = disease;
      this.headers = [
        { label: "ID", value: "id" },
        { label: "Name", value: "name" },
        { label: "Description", value: "description" },
        { label: "Medecines", value: "medecines" },
      ];
    });
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
}
