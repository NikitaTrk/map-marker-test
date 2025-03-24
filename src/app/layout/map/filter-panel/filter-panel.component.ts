import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PlaceType } from '../place';
import { MapModel } from '../map.model';

@Component({
  selector: 'filter-panel',
  templateUrl: './filter-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  //
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgOptimizedImage, FormsModule, MatCheckboxModule, MatButtonModule],
})
export class FilterPanelComponent {
  readonly placeTypes = Object.values(PlaceType);

  readonly iconSrc: Record<PlaceType, string> = {
    [PlaceType.Store]: 'assets/icons/places/store.svg',
    [PlaceType.Cafe]: 'assets/icons/places/cafe.svg',
    [PlaceType.Office]: 'assets/icons/places/office.svg'
  };

  constructor(readonly model: MapModel) {}
}
