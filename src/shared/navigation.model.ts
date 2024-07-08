export enum ENavigationRoute {
  DASHBOARD = 'dashboard',
  LIST = 'list',
}

export enum ENavigationUnitIcon {
  DASHBOARD = 'space_dashboard',
  LIST = 'view_list',
}

export interface INavigationMenuUnit {
  path: string[];
  label: string;
  icon: ENavigationUnitIcon;
  isActive: boolean;
}
