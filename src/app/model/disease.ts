import {Medecine} from './medecine';

export class Disease {
  id: number;
  name: string;
  description: string;
  medecines: Medecine[];


  constructor(id: number, name: string, description: string, medecines: Medecine[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.medecines = medecines;
  }
}