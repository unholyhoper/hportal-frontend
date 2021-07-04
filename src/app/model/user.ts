import { Country } from "./enum/country.enum";
import { Gender } from "./gender.enm";
import { Region } from "./enum/region.enum";
import { Role } from "./enum/role.enum";

export class User {
    firstname:String;
    lastname:String;
    email:String;
    gender:Gender;
    adress:String;
    country:Country;
    region: Region;
    password:String;
    role:Role;
    CarteMedical:number
    cin:number;
    
}
