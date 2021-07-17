import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MedecineService } from "src/app/services/medecine.service";

@Component({
  selector: "app-medecines",
  templateUrl: "./medecines.component.html",
  styleUrls: ["./medecines.component.css"],
})
export class MedecinesComponent implements OnInit {
  formControls;
  medecinesForm: FormGroup;
  isUpdate: any;
  entity = "medecines";
  id: any;
  fields: any;
  base64textString: string;

  constructor(
    private formBuilder: FormBuilder,
    private medecineService: MedecineService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formControls = {
      id: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
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
      quantity: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      expirationdate: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      price: new FormControl("", [
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
    this.medecinesForm = this.formBuilder.group(this.formControls);
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
        label: "Reference",
        type: "text",
        formControleName: "reference",
        icon: "fas fa-barcode",
      },
      {
        label: "Manufacturer",
        type: "text",
        formControleName: "manufacturer",
        icon: "fas fa-industry",
      },
      {
        label: "Quantity",
        type: "text",
        formControleName: "quantity",
        icon: "fas fa-cubes",
      },
      {
        label: "Expiration date",
        type: "text",
        formControleName: "expirationdate",
        icon: "fas fa-clock",
      },
      {
        label: "Price",
        type: "text",
        formControleName: "price",
        icon: "fas fa-dollar-sign",
      },
      {
        type: "image",
        formControleName: "image",
      },
    ];
    if (this.id !== undefined && this.id !== null) {
      this.isUpdate = true;
    } else this.isUpdate = false;
    this.medecineService.getMedecine(this.id).subscribe((res) => {
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
  }
  editForm(form) {
    let data = form.value;
    data.image = this.base64textString;
    if (this.isUpdate) {
      this.medecineService.updateMedecine(data).subscribe(
        (res) => {
          this.router.navigate([`/medecineTable`]);
        },
        (err) => {}
      );
    } else {
      this.medecineService.addMedecine(data).subscribe(
        (res) => {
          this.router.navigate([`/medecineTable`]);
        },
        (err) => {}
      );
    }
  }
  back() {
    this.router.navigate([`/medecineTable`]);
  }
}
