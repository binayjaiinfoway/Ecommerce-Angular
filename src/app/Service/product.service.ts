import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:40400/EShop';
  constructor( private http:HttpClient) { }

  GetProducts(){
   return this.http.get(`${this.url}/Product`)
  }

}
