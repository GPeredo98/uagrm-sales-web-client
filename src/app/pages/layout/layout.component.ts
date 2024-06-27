import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public pagina: string;

  public readonly PRODUCTOS: string = 'productos';
  public readonly CLIENTES: string = 'clientes';
  public readonly EMPLEADOS: string = 'empleados';
  public readonly ALMACENES: string = 'almacenes';

  constructor(private router: Router) {
    this.pagina = this.PRODUCTOS;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
