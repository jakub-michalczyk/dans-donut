import { Injectable } from '@angular/core';
import {
  ENavigationRoute,
  ENavigationUnitIcon,
  INavigationMenuUnit,
} from '../navigation.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  getNavigationUnits(): INavigationMenuUnit[] {
    return Object.values(ENavigationRoute).map((route) => ({
      path: [`/${String(route)}`],
      label: `SHARED.${route.toUpperCase()}`,
      icon: ENavigationUnitIcon[
        route.toUpperCase() as keyof typeof ENavigationUnitIcon
      ],
      isActive: false,
    }));
  }
}
