import { Directive, Input } from '@angular/core';
import { ISaleSummaryDTO } from '../../model/dasboard.model';

@Directive()
export abstract class DashboardCardBaseComponent {
  @Input() saleSummary = {} as ISaleSummaryDTO | null;

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
}
