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

  LoadReviewByProjectId(pId: number): Promise<any> {
    // console.log('pId', pId);
    return lastValueFrom(this.httpClient.post<number>(this.baseUrl + 'Imputation/GetImputationsByProjectId', pId));
  }


}
