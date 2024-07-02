import { Directive, Input } from '@angular/core';
import { EDateFormat, ISaleSummaryDTO } from '../../model/dasboard.model';
import { DashboardApiService } from '../../service/dashboard-api.service';

@Directive()
export abstract class DashboardCardComponent {
  saleSummary = {} as ISaleSummaryDTO;

  @Input() set dateTo(value: string) {
    this._dateTo = value;
    this.tryGetSaleSummary();
  }

  @Input() set dateFrom(value: string) {
    this._dateFrom = value;
    this.tryGetSaleSummary();
  }

  private _dateTo = '';
  private _dateFrom = '';

  constructor(private dashboardApi: DashboardApiService) {}

  private tryGetSaleSummary() {
    if (this.isDateRangeValid()) {
      this.getSaleSummary();
    }
  }

  private isDateRangeValid(): boolean {
    if (!this._dateFrom) {
      return false;
    }
    if (this._dateTo && new Date(this._dateFrom) > new Date(this._dateTo)) {
      return false;
    }
    return true;
  }

  private getSaleSummary() {
    const dayDifference = this.getDateDifferenceInDays(
      this.dateFrom,
      this.dateTo
    );
    const dateFormat = this.getDateFormat(dayDifference);
    this.dashboardApi
      .getSaleSummary(EDateFormat[dateFormat].toLowerCase())
      .subscribe((summary) => (this.saleSummary = summary));
  }

  private getDateDifferenceInDays(dateFrom: string, dateTo?: string): number {
    if (!dateTo) {
      dateTo = new Date().toISOString().split('T')[0]; // Użyj dzisiejszej daty, jeśli dateTo jest puste
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
