import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SideMenuComponent } from '../core/side-menu/side-menu.component';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { ENavigationRoute } from '../shared/navigation.model';
import { SelectComponent } from '../shared/components/select/select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideMenuComponent, WrapperComponent, SelectComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentlyViewedRoutingObj = {} as NavigationEnd;
  ENavigationRoute = ENavigationRoute;
  options = ['SHARED.DAY', 'SHARED.WEEK', 'SHARED.MONTH'];

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentlyViewedRoutingObj = event;
      }
    });
  }

  isCurrentlyDashboardViewed = () =>
    this.currentlyViewedRoutingObj.url === `/${ENavigationRoute.DASHBOARD}`;
}
