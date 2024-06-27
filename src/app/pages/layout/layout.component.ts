import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public pagina: string;
  public readonly APP_VERSION: string = environment.APP_VERSION; 

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
