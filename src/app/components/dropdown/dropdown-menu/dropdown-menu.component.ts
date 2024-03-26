import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px)', // Initial position above, adjust as needed
        }),
        animate(
          '0.15s ease-in-out',
          style({
            opacity: 1,
            transform: 'translateY(0)', // Final position at its original place
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0)', // Initial position at its original place
        }),
        animate(
          '0.15s ease-in-out',
          style({
            opacity: 0,
            transform: 'translateY(-10px)', // Final position above, adjust as needed
          })
        ),
      ]),
    ]),
  ],
})
export class DropdownMenuComponent {
  @Input() selected: string = '';
  @Output() onSelect = new EventEmitter();
  @HostBinding('@animation') animationState = true;
  items = ['Apple', 'Banana', 'Orange', 'Grapes'];

  handleClick(value: string) {
    this.onSelect.emit(value);
  }
}
