import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  lat!: number;
  lon !: number;
  weather : any;
  positionMap !: any;

  
  loader = new Loader({
    apiKey: 'AIzaSyBIgOWEB_l-fafJuIYqbbeEFiVyyBQFuqM'
  });

  constructor(private weatherservice : WeatherService) { }

  ngOnInit(): void {
    this.getLocation(); 
    this.getMap();
  }

  getLocation(){
    if("geolocation" in navigator) {
      navigator.geolocation.watchPosition( (position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;

        this.weatherservice.getWeatherDataByCoords(this.lat,this.lon)
            .subscribe( data => {
              this.weather = data;
            });
      });
    }else {
      alert("Can't find your location. Sorry !!");
    }
  }

  getMap(){
    let loader = new Loader({
      apiKey: 'AIzaSyBIgOWEB_l-fafJuIYqbbeEFiVyyBQFuqM'
    });

    loader.load().then(() =>{
       const map = new google.maps.Map(document.getElementById("map")!, {
        center : {lat :this.lat , lng : this.lon},
        zoom : 9,
      });
        new google.maps.Marker({
        position : {lat :this.lat , lng : this.lon},
        map :map
      }); 

      map.addListener("click", (mapsMouseEvent: any) =>{
       let latitude = mapsMouseEvent.latLng.toJSON().lat; 
        let longitude = mapsMouseEvent.latLng.toJSON().lng;
       this.weatherservice.getWeatherDataByCoords(latitude,longitude)
        .subscribe( data => {
          this.weather = data;
      });
});
    });
  }

  getCity(city : string){
    this.weatherservice.getWeatherByCity(city)
      .subscribe( (data :any) => {
        this.weather = data;
        this.lat = data.coord.lat;
        this.lon = data.coord.lon;
        this.getMap();
    });
  }

  

}
