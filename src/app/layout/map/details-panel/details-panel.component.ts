import { Component } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { combineLatest, filter, map } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MapModel } from '../map.model';
import { GeoUtils } from '../geo-utils';

@Component({
  selector: 'details-panel',
  templateUrl: './details-panel.component.html',
  //
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class DetailsPanelComponent {
  readonly selectedPlace$;
  readonly allUsers$;
  readonly highlightedUserIds$;
  readonly nearestUsers$;

  constructor(readonly model: MapModel) {
    this.selectedPlace$ = this.model.selectedPlace$;
    this.allUsers$ = this.model.users$;
    this.highlightedUserIds$ = this.model.highlightedUserIds$;

    this.nearestUsers$ = combineLatest([
      this.model.users$,
      this.model.highlightedUserIds$,
      this.model.selectedPlace$.pipe(filter(Boolean))
    ]).pipe(
      map(([users, ids, selectedPlace]) => users
        .filter(u => ids.includes(u.id))
        .map(({ name, coordinates }) => ({
          name,
          distanceKm: Math.round(GeoUtils.getDistance(selectedPlace.coordinates, coordinates) / 1000)
        }))
      )
    );
  }
}
