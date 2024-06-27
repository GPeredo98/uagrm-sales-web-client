import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  obtenerProductos() {
    return this.http.get<any>(`${this.API_URL}/Producto`);
  }

  crearProducto(producto: any) {
    return this.http.post<any>(`${this.API_URL}/Producto`, producto);
  }

  eliminarProducto(id: number) {
    return this.http.delete<any>(`${this.API_URL}/Producto/${id}`);
  }
  
}
