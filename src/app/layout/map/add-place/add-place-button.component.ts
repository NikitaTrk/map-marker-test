import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlaceDialogComponent } from './add-place-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'add-place-button',
  standalone: true,
  template: `<button mat-button (click)="open()">Add place</button>`,
  imports: [MatButtonModule],
})
export class AddPlaceButtonComponent {
  constructor(private dialog: MatDialog) {}

  open(): void {
    this.dialog.open(AddPlaceDialogComponent, {
      width: '400px'
    });
  }
}
