import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../../shared/modules/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartModule } from 'primeng/chart';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { DashboardApiService } from '../../service/dashboard-api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
export class ChartComponent extends DashboardCardComponent {
  constructor(dashboardApi: DashboardApiService) {
    super(dashboardApi);
  }
}
