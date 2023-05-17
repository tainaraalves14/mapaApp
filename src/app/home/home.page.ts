import { environment } from './../../environments/environment.prod';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  Map!: GoogleMap;

  constructor() {}
  ionViewWillEnter(){
    this.createMap();
  }

  async createMap() {
    this.Map = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapskey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }

}
