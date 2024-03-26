import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [PortalModule, DropdownComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(10px)', // Initial position above, adjust as needed
        }),
        animate(
          '0.2s ease-in-out',
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
          '0.2s ease-in-out',
          style({
            opacity: 0,
            transform: 'translateY(10px)', // Final position above, adjust as needed
          })
        ),
      ]),
    ]),
  ],
})
export class ModalComponent implements OnDestroy {
  private backdropClickSubscription!: Subscription;
  overlayRef!: OverlayRef;
  @ViewChild(CdkPortal) portal!: CdkPortal;

  constructor(private overlay: Overlay) {}

  openModal() {
    this.clearBackdropClickSubscription();

    const config = new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      width: '60%',
      hasBackdrop: true,
    });

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(this.portal);

    this.backdropClickSubscription = this.overlayRef
      .backdropClick()
      .subscribe(() => this.closeModal());
  }

  closeModal() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  clearBackdropClickSubscription() {
    if (this.backdropClickSubscription) {
      this.backdropClickSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.clearBackdropClickSubscription();
  }
}
