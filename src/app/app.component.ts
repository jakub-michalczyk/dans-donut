import { Component } from '@angular/core';
import { SideMenuComponent } from '../core/side-menu/side-menu.component';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { SelectComponent } from '../shared/components/select/select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideMenuComponent, WrapperComponent, SelectComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
