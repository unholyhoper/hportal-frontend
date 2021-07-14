import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginUser } from "../model/login-user";
import { environment } from "../../environments/environment";
import { Medecine } from "../model/medecine";
import { AuthService } from "./jwt.service";

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: "root",
})
export class MedecineService {
  constructor(private httpClient: HttpClient) {}

  allMedecines(data?) {
    if (data) {
      return this.httpClient.get<any>(
        `${BASE_PATH}/allMedecines?manufacturer=${data.manufacturer}&reference=${data.reference}`
      );
    } else {
      return this.httpClient.get<any>(`${BASE_PATH}/allMedecines`);
    }
  }

  deleteMedecine(id: number) {
    return this.httpClient.delete<any>(`${BASE_PATH}/medecine/${id}`);
  }

  getMedecine(id: number) {
    return this.httpClient.get<any>(`${BASE_PATH}/medecine/${id}`);
  }
  addMedecine(medecine) {
    return this.httpClient.post<any>(`${BASE_PATH}/medecine`, medecine);
  }
  updateMedecine(medecine) {
    return this.httpClient.put<any>(
      `${BASE_PATH}/medecine/${medecine.id}`,
      medecine
    );
  }
  medecineCount() {
    return this.httpClient.get<any>(`${BASE_PATH}/countMedecines`);
  }
  getMedecineImage(id: number) {
    return this.httpClient.get<any>(`${BASE_PATH}/medecine/image/${id}`);
  }
}
