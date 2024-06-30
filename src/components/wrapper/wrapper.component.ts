import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared/shared.module';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './wrapper.component.html',
})
export class WrapperComponent {}
