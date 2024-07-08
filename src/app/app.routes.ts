import { Routes } from '@angular/router';
import { ENavigationRoute } from '../shared/navigation.model';
import { DashboardComponent } from '../dashboard/page/dashboard.component';
import { ListComponent } from '../list/page/list.component';

export const routes: Routes = [
  { path: ENavigationRoute.DASHBOARD, component: DashboardComponent },
  { path: ENavigationRoute.LIST, component: ListComponent },
  { path: '', redirectTo: ENavigationRoute.DASHBOARD, pathMatch: 'full' },
  { path: '**', redirectTo: ENavigationRoute.DASHBOARD },
];
