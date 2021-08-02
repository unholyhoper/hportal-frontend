import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { of } from 'rxjs/internal/observable/of';

const BASE_PATH = environment.basePath;


@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  constructor(private httpClient: HttpClient) {
  }

  allDiseases() {
    return this.httpClient.get<any>(`${BASE_PATH}/allDiseases`);
  }
  getDisease(id: number) {
    return this.httpClient.get<any>(`${BASE_PATH}/disease/${id}`);
  }
  deleteMedecine(id: number) {
    return this.httpClient.delete<any>(`${BASE_PATH}/disease/${id}`);
  }
  updateDisease(disease){
    return this.httpClient.put<any>(
      `${BASE_PATH}/disease/${disease.id}`,
      disease
    );
  }
  addDisease(disease){
    return this.httpClient.post<any>(`${BASE_PATH}/disease`,disease)
  }
  getDiseaseName(){
    return this.httpClient.get<any>(`${BASE_PATH}/diseaseNames`);
  }
  getDiseaseCount(){
    return this.httpClient.get<any>(`${BASE_PATH}/countDisease`);
  }
}