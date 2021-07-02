//Runette, P (2019). @runette/osm-map-component.ts [source code]. https://gist.github.com/runette/76081e513de5bbc6a1a077d67dd79db5.js

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, MapOptions, tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions= {
                      layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        opacity: 0.7,
                        maxZoom: 19,
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      })],
                      zoom:4,
                      center:latLng(30,-100)
  };
  public map: Map;
  public zoom: number;

  constructor() { 
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }
}
