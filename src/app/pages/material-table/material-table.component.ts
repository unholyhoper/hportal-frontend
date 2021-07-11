import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Material } from 'src/app/model/material';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {
  rows;
  headers;
  entity = 'Material'
  constructor(
    private route: ActivatedRoute,
    private materialService: MaterialService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.materialService
          .allMaterial()
          .subscribe((medecineList: Material[]) => {
            this.rows = medecineList;
            console.log('rows',this.rows)
            this.headers = [
              { label: "ID", value: "id" },
              { label: "Reference", value: "reference" },
              { label: "Manufacturer", value: "manufacturer" },
              { label: "Quantity", value: "quantity" },
              { label: "Expiration date", value: "expirationDate" },
              { label: "Price", value: "price" },
            ];
          });
  }
  public delete(source) {
    let index = this.rows.indexOf(source);
    console.log(index);

    this.rows.splice(index, 1);
    this.materialService.deleteMaterial(source.id).subscribe(
      (res) => {
        this.showSuccessMessage(`The item is deleted successfuly`);
      },
      (err) => {
        this.showWarningMessage(`Error when deleting item `);
      }
    );
  }
  edit(id, item) {
    this.router.navigate([`materialform/${item}/${id}`]);
  }
  add(item) {
    this.router.navigate([`materialform/${item}`]);
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