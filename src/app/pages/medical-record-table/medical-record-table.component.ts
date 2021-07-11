import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MedicalRecord } from 'src/app/model/medical-records';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-medical-record-table',
  templateUrl: './medical-record-table.component.html',
  styleUrls: ['./medical-record-table.component.scss']
})
export class MedicalRecordTableComponent implements OnInit {

  rows;
  headers;
  entity = 'Medical Record'
  constructor(
    private route: ActivatedRoute,
    private meldicalRecordService: MedicalRecordService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.meldicalRecordService
          .allMedicalRecord()
          .subscribe((medicalRecords: MedicalRecord[]) => {
            this.rows = medicalRecords;
            this.headers = [
              { label: "Patient First Name", value: "firstName" },
              { label: "Patient Last Name", value: "lastName" },
              { label: "Patient Diseases", value: "disease" },
              { label: "Patient Gender", value: "gender" },
            ];
          });
  }
  public delete(source) {
    let index = this.rows.indexOf(source);
    console.log(index);

    this.rows.splice(index, 1);
    this.meldicalRecordService.deleteMedicalRecord(source.id).subscribe(
      (res) => {
        this.showSuccessMessage(`The item is deleted successfuly`);
      },
      (err) => {
        this.showWarningMessage(`Error when deleting item `);
      }
    );
  }
  edit(id, item) {
    this.router.navigate([`medicalRecordform/${item}/${id}`]);
  }
  add(item) {
    this.router.navigate([`medicalRecordform/${item}`]);
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
