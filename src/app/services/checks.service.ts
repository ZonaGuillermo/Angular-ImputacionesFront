import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {

  baseUrl: string = 'https://localhost:7091/api/'

  constructor(
    private httpClient: HttpClient
  ) { }

  LoadReviewByProjectId(ProjectId: number): Observable<any> {
    // console.log('pId', pId);
    return this.httpClient.get<number>(this.baseUrl + 'Imputation/GetImputationsByProjectId', {params: {ProjectId}});
  }

  SendOneReview(imputationProject: any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + 'Imputation/ChangeImputationStatus', {}, {params: imputationProject});
  }

  SendAllReview(ProjectId: number) {
    return this.httpClient.put<any>(this.baseUrl + 'Imputation/AproveAllImputations', {}, {params: {ProjectId}});
  }


}
