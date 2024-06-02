import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  API_URL: string = "https://api-gateway-91.azure-api.net/products";

  constructor(private http: HttpClient) { }

  listarVentas() {
    return this.http.get<any>(`${this.API_URL}/ventas`);
  }

  registrarVenta(venta: any) {
    return this.http.post<any>(`${this.API_URL}/ventas`, venta);
  }
  
}
