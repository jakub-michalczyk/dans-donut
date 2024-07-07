import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../../shared/modules/shared/shared.module';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardCardBaseComponent } from '../dashboard-card/dashboard-card-base.component';

@Component({
  selector: 'app-sale-summary',
  standalone: true,
  imports: [
    MatCardModule,
    SharedModule,
    SelectComponent,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  templateUrl: './sale-summary.component.html',
})
export class SaleSummaryComponent extends DashboardCardBaseComponent {}
