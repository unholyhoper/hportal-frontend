import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MaterialService } from "src/app/services/material.service";

@Component({
  selector: "app-material",
  templateUrl: "./material.component.html",
  styleUrls: ["./material.component.css"],
})
export class MaterialComponent implements OnInit {
  formControls;
  materialForm: FormGroup;
  isUpdate: any;
  entity = "Material";
  id: any;
  fields: any;
  base64textString: string;

  constructor(
    private formBuilder: FormBuilder,
    private mateialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formControls = {
      id: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      type: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      quantity: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
    };
    this.materialForm = this.formBuilder.group(this.formControls);

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.fields = [
      {
        label: "Id",
        type: "text",
        formControleName: "id",
        icon: "fa fa-user",
        disabled: true,
        value: this.id,
      },
      {
        label: "name",
        type: "text",
        formControleName: "name",
        icon: "fas fa-barcode",
      },
      {
        label: "type",
        type: "text",
        formControleName: "type",
        icon: "fas fa-industry",
      },
      {
        label: "Quantity",
        type: "text",
        formControleName: "quantity",
        icon: "fas fa-cubes",
      },
      {
        type: "image",
        formControleName: "image",
      },
    ];
    console.log(this.id)
    if (this.id !== undefined && this.id !== null)
      this.isUpdate = true;
    else this.isUpdate = false;
    console.log(this.isUpdate)
    this.mateialService.getMaterial(this.id).subscribe((res) => {
      this.fields.forEach((element) => {
        element.value = res[element.formControleName];
      });
    });
  }
  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(this.base64textString)
  }
  editForm(form) {
    let data = form.value;
    data.image = this.base64textString;
    if (this.isUpdate) {
      console.log(data)
      this.mateialService.updateMaterial(data).subscribe(
        (res) => {
          this.router.navigate([`/materialTable`]);
        },
        (err) => {}
      );
    } else {
      this.mateialService.addmMaterial(data).subscribe(
        (res) => {
          this.router.navigate([`/materialTable`]);
        },
        (err) => {}
      );
    }
  }
  back() {
    this.router.navigate([`/materialTable`]);
  }
}
