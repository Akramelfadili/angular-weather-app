import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  
  link = "http://api.openweathermap.org/data/2.5/weather";
  APIKey = "db35c680ac515f4600920de1efac28b1";

  constructor(private http : HttpClient) { }

  getWeatherDataByCoords(lat :any , lon :any){
    let params = new HttpParams()
      .set("lat",lat).set("lon",lon).set("units","imperial").set("appId",this.APIKey);
    return this.http.get(this.link, {params});
  }

  getWeatherByCity(city:string){
    let params =new HttpParams()
      .set("q",city).set("units","imperial").set("appId",this.APIKey);
    return this.http.get(this.link, {params});
  }
/* 
  getWeatherDataOnMapClick(lat : number,lon :any){
    let params = new HttpParams()
        .set("lat",lat).set("lon",lon).set("units","imperial").set("appId",this.APIKey);
  } */
}
