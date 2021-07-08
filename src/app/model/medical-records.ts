import { Gender } from "./enum/gender.enm";

export class MedicalRecord{
    firstName:string;
    lastName:string;
    disease:string;
    gender:Gender;

    constructor(firstName,lastName,disease,gender){
        this.firstName=firstName
        this.lastName=lastName
        this.disease=disease
        this.gender=gender
    }

}