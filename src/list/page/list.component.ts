import { Component } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared/shared.module';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list.component.html',
})
export class ListComponent {}
