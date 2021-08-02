import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs/internal/observable/of";
import { environment } from "src/environments/environment";
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: "root",
})
export class MaterialService {
  constructor(private httpClient: HttpClient) {}
  allMaterial(data?) {
    if (data)
      return this.httpClient.get<any>(
        `${BASE_PATH}/allMaterial?type=${data.type}&name=${data.name}`
      );
    else return this.httpClient.get<any>(`${BASE_PATH}/allMaterial`);
  }
  getMaterialImage(id: number) {
    return this.httpClient.get<any>(`${BASE_PATH}/material/image/${id}`);
  }
  deleteMaterial(id) {
    return this.httpClient.delete<any>(`${BASE_PATH}/material/${id}`);
  }
  getMaterial(id) {
    return this.httpClient.get<any>(`${BASE_PATH}/material/${id}`);
  }
  updateMaterial(material) {
    return this.httpClient.put<any>(
      `${BASE_PATH}/material/${material.id}`,
      material
    );
  }
  addmMaterial(material) {
    return this.httpClient.post<any>(`${BASE_PATH}/material`, material);
  }
  getCountMaterial() {
    return this.httpClient.get<any>(`${BASE_PATH}/countMaterial`);
  }
}
