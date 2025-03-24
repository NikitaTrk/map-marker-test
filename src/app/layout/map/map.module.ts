import { NgModule } from '@angular/core';
import { MapContainerComponent } from './map-container/map-container.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { AddPlaceButtonComponent } from './add-place/add-place-button.component';

@NgModule({
  imports: [
    MapContainerComponent,
    FilterPanelComponent,
    DetailsPanelComponent,
    AddPlaceButtonComponent
  ],
  exports: [
    MapContainerComponent,
    FilterPanelComponent,
    DetailsPanelComponent,
    AddPlaceButtonComponent
  ]
})
export class MapModule {}
