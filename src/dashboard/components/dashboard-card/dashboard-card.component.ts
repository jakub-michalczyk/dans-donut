import { Directive, Input } from '@angular/core';
import {
  EDateFormat,
  IChartData,
  IDate,
  ISaleSummaryDTO,
} from '../../model/dasboard.model';
import { DashboardApiService } from '../../service/dashboard-api.service';

@Directive()
export abstract class DashboardCardComponent {
  saleSummary: ISaleSummaryDTO | null = null;
  chartData = {} as IChartData;
  @Input({ required: true }) set date(value: IDate | null) {
    if (value) {
      this._dateFrom = value.from;
      this._dateTo = value.to;
      this.getSaleSummary();
    }
  }

  private _dateTo = '';
  private _dateFrom = '';

  constructor(private dashboardApi: DashboardApiService) {}

  private getSaleSummary() {
    const dayDifference = this.getDateDifferenceInDays(
      this.dateFrom,
      this.dateTo
    );
    const dateFormat = this.getDateFormat(dayDifference);
    this.dashboardApi
      .getSaleSummary(EDateFormat[dateFormat].toLowerCase())
      .subscribe((summary) => {
        this.saleSummary = summary;
        this.chartData = {
          labels: this.generateTimeIntervals(),
          datasets: [
            {
              label: 'Sale',
              data: summary.chartData,
              backgroundColor: 'rgb(219, 39, 119)',
            },
          ],
        };
      });
  }

  private getDateDifferenceInDays(dateFrom: string, dateTo?: string): number {
    if (!dateTo) {
      dateTo = new Date().toISOString().split('T')[0];
    }
    return Math.floor((Date.parse(dateTo) - Date.parse(dateFrom)) / 86400000);
  }

  private getDateFormat(dayDifference: number): EDateFormat {
    switch (dayDifference) {
      case 7:
        return EDateFormat.WEEK;
      case 30:
        return EDateFormat.MONTH;
      default:
        return EDateFormat.DAY;
    }
  }

  private hasSaleUpwardTrend(progress: number): boolean {
    return progress > 0;
  }

  private generateTimeIntervals(): string[] {
    const times: string[] = [];
    const currentHour = new Date().getHours();

    for (let hour = 0; hour <= currentHour; hour += 2) {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      times.push(timeStr);
    }

    return times;
  }

  isSaleSummaryFetched = () =>
    this.saleSummary !== null ? Object.keys(this.saleSummary).length : null;

  getProgressIconColor(progress: number): string {
    return this.hasSaleUpwardTrend(progress)
      ? 'text-green-600'
      : 'text-red-600';
  }

  getProgressionSymbol(progress: number): string {
    return this.hasSaleUpwardTrend(progress) ? '+' : '';
  }

  getProgressionIcon(progress: number): string {
    return this.hasSaleUpwardTrend(progress) ? 'trending_up' : 'trending_down';
  }

  get dateTo(): string {
    return this._dateTo;
  }

  get dateFrom(): string {
    return this._dateFrom;
  }
}
