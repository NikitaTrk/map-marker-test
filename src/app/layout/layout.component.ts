import { Component } from '@angular/core';
import { MapModule } from './map/map.module';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  //
  standalone: true,
  imports: [MapModule]
})
export class LayoutComponent {}
