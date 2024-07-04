import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { SelectComponent } from '../../shared/components/select/select.component';
import { EDateFormat, IDate, ISaleSummaryDTO } from '../model/dasboard.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SaleSummaryComponent } from '../components/sale-summary/sale-summary.component';
import { PopularItemComponent } from '../components/popular-item/popular-item.component';
import { BehaviorSubject } from 'rxjs';
import { ChartComponent } from '../components/chart/chart.component';

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
  ],
  providers: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  options: string[] = [];
  dateObject = new BehaviorSubject<IDate>({} as IDate);
  saleSummary = {} as ISaleSummaryDTO;

  constructor() {
    this.dateObject.next({ from: this.setUpTodayDate(), to: '' });
    this.setUpSelectOptions();
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
