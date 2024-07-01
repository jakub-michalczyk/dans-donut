import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { SelectComponent } from '../../shared/components/select/select.component';
import { EDateFormat, ISaleSummaryDTO } from '../model/dasboard.model';
import { DashboardApiService } from '../service/dashboard-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    SharedModule,
    SelectComponent,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  options: string[] = [];
  dateFrom = signal('');
  dateTo = signal('');
  saleSummary = {} as ISaleSummaryDTO;

  constructor(private dashboardApi: DashboardApiService) {
    this.dateFrom.set(this.setUpTodayDate());
    this.setUpSelectOptions();
    this.getSaleSummary(EDateFormat.DAY);
  }

  getSaleSummary(dateFormat: EDateFormat) {
    this.dashboardApi
      .getSaleSummary(EDateFormat[dateFormat].toLowerCase())
      .subscribe((summary) => (this.saleSummary = summary));
  }

  setUpSelectOptions() {
    this.options = Object.values(EDateFormat)
      .filter((v) => isNaN(Number(v)))
      .map((dateFormat) => (dateFormat = `SHARED.${dateFormat}`));
  }

  updateDateValues(dateFormat: string) {
    const converttedString =
      EDateFormat[
        dateFormat.replace('SHARED.', '') as keyof typeof EDateFormat
      ];

    switch (converttedString) {
      case EDateFormat.DAY: {
        this.dateTo.set('');
        this.dateFrom.set(this.setUpTodayDate());
        break;
      }
      case EDateFormat.WEEK: {
        const weekDates = this.getWeekRange();
        this.dateTo.set(weekDates.to);
        this.dateFrom.set(weekDates.from);
        break;
      }
      case EDateFormat.MONTH: {
        const monthDates = this.getMonthRange();
        this.dateTo.set(monthDates.to);
        this.dateFrom.set(monthDates.from);
        break;
      }
      default:
        break;
    }

    this.getSaleSummary(converttedString);
  }

  setUpTodayDate = () => new Date().toISOString().slice(0, 10);

  getWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 7);

    return {
      from: startOfWeek.toISOString().slice(0, 10),
      to: today.toISOString().slice(0, 10),
    };
  };

  getMonthRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today);
    startOfMonth.setMonth(today.getMonth() - 1);

    return {
      from: startOfMonth.toISOString().slice(0, 10),
      to: today.toISOString().slice(0, 10),
    };
  };

  hasSaleUpwordTrend = (progress: number) => progress > 0;

  getProgressIconColor = (progress: number) =>
    this.hasSaleUpwordTrend(progress) ? 'text-green-600' : 'text-red-600';

  getProgressionSymbol = (progress: number) =>
    this.hasSaleUpwordTrend(progress) ? '+' : '';

  getProgressionIcon = (progress: number) =>
    this.hasSaleUpwordTrend(progress) ? 'trending_up' : 'trending_down';
}
