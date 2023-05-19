import { environment } from './../../environments/environment.prod';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, Position} from '@capacitor/geolocation';

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

  async buscarPosicao() {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);
    this.AdicionarMarcador(coordinates)
    return coordinates;
  }

  AdicionarMarcador(coordinates: Position){
    // Add a marker to the map
    const markerId = this.Map.addMarker({
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      },

    })

  }
  zoomNoMarcador(){
    this.Map.setCamera({
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      },
      zoom: 15,
      animate: true
    });
  }




}
