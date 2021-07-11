import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Medecine } from "src/app/model/medecine";
import { MedecineService } from "src/app/services/medecine.service";

@Component({
  selector: "app-medecines-table",
  templateUrl: "./medecines-table.component.html",
  styleUrls: ["./medecines-table.component.scss"],
})
export class MedecinesTableComponent implements OnInit {
  rows;
  headers;
  entity = 'Medecines'
  searchForm: FormGroup
  formControls
  fields: { label: string; type: string; formControleName: string; icon: string; }[];
  constructor(
    private route: ActivatedRoute,
    private medecineService: MedecineService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.formControls = {
      reference: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      manufacturer: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
    };
    this.searchForm = this.formBuilder.group(this.formControls);
  }

  ngOnInit(): void {
    this.medecineService
          .allMedecines()
          .subscribe((medecineList: Medecine[]) => {
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
    this.medecineService.deleteMedecine(source.id).subscribe(
      (res) => {
        this.showSuccessMessage(`The item is deleted successfuly`);
      },
      (err) => {
        this.showWarningMessage(`Error when deleting item `);
      }
    );
  }
  edit(id, item) {
    this.router.navigate([`medecinesform/${item}/${id}`]);
  }
  add(item) {
    this.router.navigate([`medecinesform/${item}`]);
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

  searchFormquerry(form){
    let data = form.value
    console.log(data)
    this.medecineService
    .allMedecines(data)
    .subscribe((medecineList: Medecine[]) => {
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
      this.showSuccessMessage('')
    },err =>{
      this.showWarningMessage('')
    }
    );
  }
}
