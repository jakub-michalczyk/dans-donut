import { Routes } from '@angular/router';
import { ENavigationRoute } from '../shared/navigation.model';
import { DashboardComponent } from '../dashboard/page/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: ENavigationRoute.DASHBOARD, pathMatch: 'full' },
  { path: ENavigationRoute.DASHBOARD, component: DashboardComponent },
  { path: '**', redirectTo: ENavigationRoute.DASHBOARD },
];
