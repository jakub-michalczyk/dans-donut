import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { NavigationService } from '../../shared/services/navigation.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { ELanguageCode } from '../../shared/utils/country.enum';
import { Observable, map, startWith } from 'rxjs';
import { LanguageUnit } from '../../shared/model/language.model';
import { INavigationMenuUnit } from '../../shared/navigation.model';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule, SharedModule, RouterLink, MatButtonModule],
  templateUrl: './side-bar.component.html',
})
export class SideMenuComponent {
  languages$?: Observable<LanguageUnit[]>;
  ELanguageCode = ELanguageCode;
  activeLang = ELanguageCode.PL;
  navigationUnits: INavigationMenuUnit[] = [];

  constructor(
    protected navigationService: NavigationService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.navigationUnits = this.navigationService.getNavigationUnits();
    this.setUpLanguageSub();
    this.setUpRouterEvent();
  }

  setUpLanguageSub() {
    this.languages$ = this.translate.onDefaultLangChange.pipe(
      map((event) => event.lang),
      startWith(this.translate.defaultLang),
      map((defaultLang) => this.getLanguageUnits(defaultLang))
    );
  }

  setUpRouterEvent() {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.navigationUnits.forEach((unit) => {
          unit.isActive = unit.path.includes(value.url);
        });
      }
    });
  }

  changeLang(code: ELanguageCode) {
    this.translate.setDefaultLang(code);
  }

  private getLanguageUnits(defaultLang: string): LanguageUnit[] {
    return [
      this.createLanguageUnit(ELanguageCode.PL, defaultLang as ELanguageCode),
      this.createLanguageUnit(ELanguageCode.EN, defaultLang as ELanguageCode),
    ];
  }

  private createLanguageUnit(
    code: ELanguageCode,
    defaultLang: ELanguageCode
  ): LanguageUnit {
    return {
      isActive: defaultLang === code,
      label: code.toUpperCase(),
      code,
    };
  }
}
