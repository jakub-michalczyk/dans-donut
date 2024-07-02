import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../../shared/modules/shared/shared.module';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { DashboardApiService } from '../../service/dashboard-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { TranslateService } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-popular-item',
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
  templateUrl: './popular-item.component.html',
})
export class PopularItemComponent extends DashboardCardComponent {
  constructor(
    private translate: TranslateService,
    dashboardApi: DashboardApiService
  ) {
    super(dashboardApi);
  }

  protected getItemName(id: number) {
    return this.translate.instant(`ITEMS.${id}.NAME`);
  }
}
