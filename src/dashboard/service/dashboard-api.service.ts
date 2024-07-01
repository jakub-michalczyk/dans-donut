import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ISaleSummaryDTO } from '../model/dasboard.model';
@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  constructor(private http: HttpClient) {}

  getSaleSummary(dateFormat: string) {
    return this.http.get<ISaleSummaryDTO>(`/${dateFormat}`).pipe(
      catchError((error: Error) => {
        return throwError(() => error);
      })
    );
  }
}
