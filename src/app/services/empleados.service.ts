import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  obtenerEmpleados() {
    return this.http.get<any>(`${this.API_URL}/Empleado`);
  }

  crearEmpleado(empleado: any) {
    return this.http.post<any>(`${this.API_URL}/Empleado`, empleado);
  }

  eliminarEmpleado(id: number) {
    return this.http.delete<any>(`${this.API_URL}/Empleado/${id}`);
  }
  
}
