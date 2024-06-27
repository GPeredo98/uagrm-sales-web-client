import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AlmacenesService {
  API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  obtenerAlmacenes() {
    return this.http.get<any>(`${this.API_URL}/Almacen`);
  }

  crearAlmacen(almacen: any) {
    return this.http.post<any>(`${this.API_URL}/Almacen`, almacen);
  }

  eliminarAlmacen(id: number) {
    return this.http.delete<any>(`${this.API_URL}/Almacen/${id}`);
  }
}
