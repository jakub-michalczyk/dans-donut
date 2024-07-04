import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map } from 'rxjs';
import { ISaleSummaryDTO } from '../model/dasboard.model';
import { getRandomChartData } from '../../shared/utils/functions';
@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  constructor(private http: HttpClient) {}

  getSaleSummary(dateFormat: string) {
    return this.http.get<ISaleSummaryDTO>(`/${dateFormat}`).pipe(
      map((saleSummary) => {
        saleSummary.chartData = getRandomChartData(saleSummary.amountSold);
        /* this is strictly front-end app, a database is done simply by my-json-server, 
		so to calculate chart's bars i did a little helper function */
        return saleSummary;
      }),
      catchError((error: Error) => {
        return throwError(() => error);
      })
    );
  }
}
