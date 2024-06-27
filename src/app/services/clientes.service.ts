import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  obtenerClientes() {
    return this.http.get<any>(`${this.API_URL}/Cliente`);
  }

  crearCliente(cliente: any) {
    return this.http.post<any>(`${this.API_URL}/Cliente`, cliente);
  }

  eliminarCliente(id: number) {
    return this.http.delete<any>(`${this.API_URL}/Cliente/${id}`);
  }
}
