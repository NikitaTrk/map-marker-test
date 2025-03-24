import { ApplicationRef, Component, createComponent, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Subject, takeUntil, map, take, filter } from 'rxjs';

import { LayerGroup, Map as LeafletMap, Marker, tileLayer } from 'leaflet';

import { MapModel } from '../map.model';
import { highlightedUserIcon, placeIcon, userIcon } from './marker-icons';
import { UserPopupComponent } from '../user-popup/user-popup.component';

import { User } from '../user';

@Component({
  selector: 'map-container',
  templateUrl: './map-container.component.html',
  //
  standalone: true
})
export class MapContainerComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) private mapContainer!: ElementRef<HTMLDivElement>;
  private map!: LeafletMap;

  ngOnInit(): void {
    this.initMap();

    this.setPlaceMarkers();
    this.setUserMarkers();
  }

  constructor(private readonly model: MapModel, private readonly appRef: ApplicationRef) {
    this.model.selectedPlace$
      .pipe(filter(Boolean), takeUntil(this.destroyed$))
      .subscribe(place => {
        this.map.setView(place.coordinates, this.map.getZoom(), { animate: true });
      });

    this.model.highlightedUserIds$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(ids => {
        this.userMarkerMap.forEach((marker, id) => {
          marker.setIcon(ids.includes(id) ? highlightedUserIcon : userIcon);
        });
      });
  }

  private initMap(): void {
    this.map = new LeafletMap(this.mapContainer.nativeElement).setView([50.4501, 30.5234], 10);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  private readonly placeLayerGroup = new LayerGroup();
  private setPlaceMarkers(): void {
    this.placeLayerGroup.addTo(this.map);

    combineLatest([this.model.places$, this.model.typesFilter$]).pipe(
      map(([places, filters]) => places.filter(({ type }) => filters.includes(type))),
      takeUntil(this.destroyed$)
    ).subscribe(filteredPlaces => {
      this.placeLayerGroup.clearLayers();
      filteredPlaces.forEach(place => {
        const marker = new Marker(place.coordinates, { icon: placeIcon })
          .on('click', () => this.model.setSelectedPlaceId(place.id));

        this.placeLayerGroup.addLayer(marker);
      });
    });
  }

  private readonly userLayerGroup = new LayerGroup();
  private readonly userMarkerMap = new Map<number, Marker>();
  private setUserMarkers(): void {
    this.userLayerGroup.addTo(this.map);

    this.model.users$
      .pipe(take(1))
      .subscribe(users => {
        users.forEach(user => {
          const marker = new Marker(user.coordinates, { icon: userIcon })
            .bindPopup(this.createUserPopupComponent(user));

          this.userMarkerMap.set(user.id, marker);
          this.userLayerGroup.addLayer(marker);
        });
      });
  }

  private createUserPopupComponent(user: User): HTMLElement {
    const componentRef = createComponent(UserPopupComponent, { environmentInjector: this.appRef.injector });
    componentRef.instance.user = user;
    this.appRef.attachView(componentRef.hostView);

    return componentRef.location.nativeElement;
  }

  private readonly destroyed$ = new Subject<void>();
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
