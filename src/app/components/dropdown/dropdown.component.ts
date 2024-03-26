import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, OverlayModule, DropdownMenuComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DropdownComponent {
  selectedOption: string = '';
  protected menuOpen = false;

  handleSelect(event: string) {
    this.selectedOption = event;
    this.menuOpen = false;
  }
}
