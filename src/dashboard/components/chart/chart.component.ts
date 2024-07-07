import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../../shared/modules/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartModule } from 'primeng/chart';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardCardBaseComponent } from '../dashboard-card/dashboard-card-base.component';
import { IChartData } from '../../model/dasboard.model';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    MatCardModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    ChartModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  templateUrl: './chart.component.html',
})
export class ChartComponent extends DashboardCardBaseComponent {
  @Input({ required: true }) chartData = {} as IChartData;
}
