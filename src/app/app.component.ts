import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DropdownComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
