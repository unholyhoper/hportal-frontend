import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MedecineService} from '../../services/medecine.service';
import {Medecine} from '../../model/Medecine';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  public medecines: Medecine[];
  public entity2: String;
  public field1: String;
  public field2: String;
  public field3: String;
  public field4: String;
  public field5: String;
  public field6: String;
  private thead: String[];
  private theadList: String[];

  constructor(private route: ActivatedRoute, private medecineService: MedecineService) {
  }

  ngOnInit() {
    let entity = this.route.snapshot.paramMap.get('model');
    this.entity2 = entity;
    switch (entity) {
      case 'Medecines': {

        this.theadList = ['ID', 'Reference', 'Manufacturer', 'Quantity', 'Expiration date', 'Price'];
        console.log('loading medecines managmeent page');
        this.medecineService.allMedecines()
          .subscribe((medecineList: Medecine[]) => {
            this.medecines = medecineList;
          });
        console.log(this.medecines);

      }
      case 'Another': {
        //statements;
        break;
      }
      default: {
        //statements;
        break;
      }
    }

  }

}
