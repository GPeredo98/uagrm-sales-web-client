import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  nuevoProducto: any = {
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: 0,
    cantidad: 0,
    categoria: 'MODA',
    disponible: true
  };

  constructor(private productosService: ProductosService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productosService.obtenerProductos().subscribe(response => {
      if (response.success) {
        this.productos = response.data;
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.obtenerProductos();
        }
      }
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'Save click') {
        // Aquí puedes llamar a un método para guardar el nuevo producto
      }
    }, (reason) => {
      // Manejar el cierre del modal
    });
  }

  // Método para crear un nuevo producto
  crearProducto(producto: any) {
    this.productosService.crearProducto(producto).subscribe(response => {
      if (response.success) {
        this.productos.push(response.data);
        this.obtenerProductos();
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.crearProducto(producto);
        }
      }
    });
  }

  eliminarProducto(id: number) {
    this.productosService.eliminarProducto(id).subscribe(response => {
      if (response.success) {
        this.obtenerProductos();
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.eliminarProducto(id);
        }
      }
    })
  }

  cerrarSesion() {
    // Lógica para cerrar sesión, por ejemplo, limpiar tokens y redirigir a la página de login
    localStorage.removeItem('token'); // O cualquier otra lógica para limpiar la sesión
    this.router.navigate(['/login']);
  }
}
