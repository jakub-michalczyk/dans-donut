import { Component, inject, DestroyRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { SelectComponent } from '../../shared/components/select/select.component';
import {
  EDateFormat,
  IChartData,
  IDate,
  ISaleSummaryDTO,
} from '../model/dasboard.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SaleSummaryComponent } from '../components/sale-summary/sale-summary.component';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { DashboardCardComponent } from '../components/dashboard-card/dashboard-card.component';
import { DashboardApiService } from '../service/dashboard-api.service';
import { PopularItemComponent } from '../components/popular-item/popular-item.component';
import { ChartComponent } from '../components/chart/chart.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    SharedModule,
    SelectComponent,
    MatIconModule,
    MatButtonModule,
    SaleSummaryComponent,
    PopularItemComponent,
    ChartComponent,
    DashboardCardComponent,
  ],
  providers: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  options: string[] = [];
  dateObject = new BehaviorSubject<IDate>({} as IDate);
  saleSummary: ISaleSummaryDTO | null = null;
  chartData = {} as IChartData;
  private destroyRef = inject(DestroyRef);

  constructor(
    private dashboardApi: DashboardApiService,
    private translate: TranslateService
  ) {
    this.dateObject.next({ from: this.setUpTodayDate(), to: '' });
    this.setUpSelectOptions();
    this.fetchSaleSummaryData();
  }

  private fetchSaleSummaryData() {
    const saleSummary$ = this.getSaleSummaryObservable();
    const translation$ = this.getTranslationObservable();

    combineLatest([saleSummary$, translation$]).subscribe(
      ([summary, saleLabel]) => {
        this.saleSummary = summary;
        this.chartData = {
          labels: this.generateTimeIntervals(),
          datasets: [
            {
              label: saleLabel,
              data: summary.chartData,
              backgroundColor: 'rgb(219, 39, 119)',
            },
          ],
        };
      }
    );
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

  private generateTimeIntervals(): string[] {
    const times: string[] = [];
    const currentHour = new Date().getHours();

    for (let hour = 0; hour <= currentHour; hour += 2) {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      times.push(timeStr);
    }

    return times;
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
        this.dateObject.next({ from: this.setUpTodayDate(), to: '' });
        break;
      }
      case EDateFormat.WEEK: {
        const weekDates = this.getWeekRange();
        this.dateObject.next({ from: weekDates.from, to: weekDates.to });
        break;
      }
      case EDateFormat.MONTH: {
        const monthDates = this.getMonthRange();
        this.dateObject.next({ from: monthDates.from, to: monthDates.to });
        break;
      }
      default:
        break;
    }
  }

  private getTranslationObservable = () =>
    this.translate.onDefaultLangChange.pipe(
      startWith(this.translate.currentLang),
      switchMap(() => this.translate.get('SHARED.SALE'))
    );

  private getSaleSummaryObservable = () =>
    this.dateObject.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((date) => {
        const dayDifference = this.getDateDifferenceInDays(date.from, date.to);
        const dateFormat = this.getDateFormat(dayDifference);
        return this.dashboardApi.getSaleSummary(
          EDateFormat[dateFormat].toLowerCase()
        );
      })
    );

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
}
