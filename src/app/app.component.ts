import { Component, ViewChild, ElementRef } from '@angular/core';
import { SideMenuComponent } from '../core/side-bar/side-bar.component';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { SelectComponent } from '../shared/components/select/select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SideMenuComponent,
    WrapperComponent,
    SelectComponent,
    SideMenuComponent,
  ],
  providers: [],
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('hamburger') hamburger!: ElementRef;
  @ViewChild('sideBar') sideBar!: ElementRef;

  toggleSideBar() {
    if (this.hamburger && this.sideBar) {
      this.hamburger.nativeElement.classList.toggle('tham-active');
      this.sideBar.nativeElement.classList.toggle('translate-x-0');
    }
  }
}
