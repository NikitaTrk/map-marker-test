import { Component } from '@angular/core';
import { PlaceType } from '../place';
import { MapModel } from '../map.model';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';

@Component({
  templateUrl: './add-place-dialog.component.html',
  //
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class AddPlaceDialogComponent {
  name = '';
  type: PlaceType = PlaceType.Store;
  lat = 10.11;
  lng = 10.11;

  readonly types = Object.values(PlaceType);

  constructor(
    private readonly model: MapModel,
    private readonly ref: MatDialogRef<AddPlaceDialogComponent>
  ) {}

  submit(): void {
    this.model.mockAddPlace({
      name: this.name.trim(),
      type: this.type,
      coordinates: [this.lat, this.lng]
    });

    this.ref.close();
  }

  cancel(): void {
    this.ref.close();
  }
}
