import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiseaseService } from 'src/app/services/disease.service';
import { MedecineService } from 'src/app/services/medecine.service';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css']
})
export class DiseasesComponent implements OnInit {
  formControls;
  medecinesForm: FormGroup;
  isUpdate: any;
  entity = 'Disease'
  id: any;
  fields: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  requiredField: boolean;
  
  constructor(
    private formBuilder: FormBuilder,
    private diseaseService: DiseaseService,
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
      name: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2),
      ]),
      // medecines: new FormControl("", [
      //   Validators.required,
      //   Validators.pattern("[A-Za-z .'-]+"),
      //   Validators.minLength(2),
      // ]),
    };
    this.medecinesForm = this.formBuilder.group(this.formControls);
    if (this.id !== undefined){
      this.isUpdate = true
    }
    else
      this.isUpdate = false
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
      this.fields = [
        {
          label: 'Id',
          type: 'text',
          formControleName: 'id',
          icon: 'fa fa-user',
          disabled: true,
          value: this.id
        },
        {
          label: 'Name',
          type: 'text',
          formControleName: 'name',
          icon: 'fas fa-user',
        },
        {
          label: 'description',
          type: 'textarea',
          formControleName: 'description',
          icon: 'fas fa-industry',
        },
      ];
      this.getData()
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
      this.setStatus();

      this.diseaseService.getDisease(this.id).subscribe(res => {
          this.fields.forEach(element => {
            element.value = res[element.formControleName]
          });  
      });
      if (this.id !== undefined && this.id !== null) {
        this.isUpdate = true;
        this.diseaseService.getDisease(this.id).subscribe((res) => {
          this.fields.forEach((element) => {
            element.value = res[element.formControleName];
          });
        });
      } else this.isUpdate = false;
      
  }
  getData(): void {
    let tmp = [];
    this.medecineService.getMedecinesName().subscribe(data => {
      for(let i=0; i < data.length; i++) {
        tmp.push({ item_id: i, item_text: data[i].name });
      }
      this.dropdownList = tmp;
    });
  }
  
  setStatus() {
    this.selectedItems.length > 0
      ? (this.requiredField = true)
      : (this.requiredField = false);
  }
  onItemSelect(item: any) {
    this.setClass();
  }

  onSelectAll(items: any) {
    this.setClass();
  }

  setClass() {
    this.setStatus();
    if (this.selectedItems.length > 0) {
      return "validField";
    } else {
      return "invalidField";
    }
  }
  
  editForm(form) {
    let data = form.value;
    if (this.isUpdate) {
      this.diseaseService.updateDisease(data).subscribe(
        (res) => {
          this.router.navigate([`/diseaseTable`]);
        },
        (err) => {}
      );
    } else {
      this.diseaseService.addDisease(data).subscribe(
        (res) => {
          this.router.navigate([`/diseaseTable`]);
        },
        (err) => {}
      );
    }
  }
  back() {
    this.router.navigate([`/diseaseTable`]);
  }
}
