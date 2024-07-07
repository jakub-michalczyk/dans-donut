import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../../shared/modules/shared/shared.module';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardCardBaseComponent } from '../dashboard-card/dashboard-card-base.component';

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
export class PopularItemComponent extends DashboardCardBaseComponent {
  constructor(private translate: TranslateService) {
    super();
  }

  protected getItemName(id: number) {
    return this.translate.instant(`ITEMS.${id}.NAME`);
  }
}
