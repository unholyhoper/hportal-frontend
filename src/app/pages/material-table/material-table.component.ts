import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Material } from "src/app/model/material";
import { MaterialService } from "src/app/services/material.service";

@Component({
  selector: "app-material-table",
  templateUrl: "./material-table.component.html",
  styleUrls: ["./material-table.component.scss"],
})
export class MaterialTableComponent implements OnInit {
  headers;
  entity = "Material";
  rows: {
    id: number;
    name: string;
    type: number;
    quantity: number;
    image: SafeResourceUrl;
  }[];
  searchForm: FormGroup;
  formControls;

  constructor(
    private route: ActivatedRoute,
    private materialService: MaterialService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.formControls = {
      type: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
    };
    this.searchForm = this.formBuilder.group(this.formControls);
  }

  ngOnInit(): void {
    this.materialService.allMaterial().subscribe((materialList) => {
      this.rows = materialList;
      console.log("rows", this.rows);
      this.headers = [
        { label: "name", value: "name" },
        { label: "type", value: "type" },
        { label: "Quantity", value: "quantity" },
        { label: "image", value: "image" },
      ];
      this.rows.map((data) => {
        if (data.image) {
          this.materialService.getMaterialImage(data.id).subscribe((res) => {
            data.image = this.sanitizer.bypassSecurityTrustResourceUrl(
              `data:image/jpg;base64,${res.image}`
            );
          });
        }
      });
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
  searchFormquerry(form) {
    let data = form.value;
    console.log(data);
    this.materialService.allMaterial(data).subscribe(
      (materialList) => {
        this.rows = materialList;
      console.log("rows", this.rows);
      this.headers = [
        { label: "name", value: "name" },
        { label: "type", value: "type" },
        { label: "Quantity", value: "quantity" },
        { label: "image", value: "image" },
      ];
      this.rows.map((data) => {
        if (data.image) {
          this.materialService.getMaterialImage(data.id).subscribe((res) => {
            data.image = this.sanitizer.bypassSecurityTrustResourceUrl(
              `data:image/jpg;base64,${res.image}`
            );
          });
        }
      });
        this.showSuccessMessage("");
      },
      (err) => {
        this.showWarningMessage("");
      }
    );
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
