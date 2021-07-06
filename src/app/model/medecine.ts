export class Medecine {
  id: number;
  reference: string;
  manufacturer: string;
  quantity: number;
  expirationDate: Date;
  price: number;

  constructor(id: number, reference: string, manufacturer: string, quantity: number, expirationDate: Date, price: number) {
    this.id = id;
    this.reference = reference;
    this.manufacturer = manufacturer;
    this.quantity = quantity;
    this.expirationDate = expirationDate;
    this.price = price;
  }

}
