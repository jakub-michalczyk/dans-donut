import { Component, Input } from '@angular/core';
import { IChartData, IDate, ISaleSummaryDTO } from '../../model/dasboard.model';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../../shared/modules/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [
    MatCardModule,
    SharedModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  templateUrl: './dashboard-card.component.html',
})
export class DashboardCardComponent {
  private _dateTo = '';
  private _dateFrom = '';
  @Input({ required: true }) cardLabelTitle = '';
  @Input() saleSummary = {} as ISaleSummaryDTO | null;
  @Input() chartData? = {} as IChartData | null;
  @Input({ required: true }) set date(value: IDate | null) {
    if (value) {
      this._dateFrom = value.from;
      this._dateTo = value.to;
    }
  }

  isDataFetched = () =>
    this.saleSummary !== null && this.chartData !== null ? true : null;

  get dateTo(): string {
    return this._dateTo;
  }

  get dateFrom(): string {
    return this._dateFrom;
  }
}
