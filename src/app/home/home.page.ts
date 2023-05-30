import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('local') mapRef!: ElementRef<HTMLElement>; 
  local!: GoogleMap;

  constructor() {}
  ionViewWillEnter() {
    this.createMap();
  }

  async createMap() {
    this.local = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.localKey,
      config: {
        center: {
          lat: -22.523551, 
          lng: -48.560933,
        },
        zoom: 1,
      },
    });
    this.buscarPosicao();
  }

  async buscarPosicao() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.focarMapa(coordinates)
  console.log('Current position:', coordinates);

  }
  focarMapa(coordinates: Position) {
    this.local.setCamera({
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      },
      zoom: 15,
      animate: true,
    });
    this.adicionarMarcador(coordinates);
  }

  async adicionarMarcador(coordinates: Position) {
    const marked = await this.local.addMarker({
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      },
    });
  }
}
