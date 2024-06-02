import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  API_URL: string = "https://api-gateway-91.azure-api.net/products";

  constructor(private http: HttpClient) { }

  obtenerProductos() {
    return this.http.get<any>(`${this.API_URL}/productos`);
  }

  crearProducto(producto: any) {
    return this.http.post<any>(`${this.API_URL}/productos`, producto);
  }
}
