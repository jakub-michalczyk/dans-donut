import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/shared/shared.module';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {
  @Input({ required: true })
  options: string[] = [];
  @Output()
  selectValueChange = new EventEmitter();
  radioControl = new FormControl();

  ngOnInit() {
    this.radioControl.setValue(this.options[0]);
  }

  updateValue() {
    this.selectValueChange.emit(this.radioControl.value);
  }
}
