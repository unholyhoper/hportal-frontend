import {Medecine} from './medecine';

export class Material {
  id: number;
  name: string;
  description: string;
  quantity:number;
  price:number;

  constructor(id: number, name: string, description: string,quantity:number,price:number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity= quantity
    this.price = price
  }
}