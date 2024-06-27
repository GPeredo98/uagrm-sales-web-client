import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from 'src/app/services/productos.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  cargandoDatos: boolean = true;
  creando: boolean = false;
  eliminando: boolean = false;

  nuevoProducto: any = {
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: 0,
    cantidad: 0,
    categoria: 'MODA',
    disponible: true
  };

  constructor(
    private productosService: ProductosService,
    private modalService: NgbModal,
    public toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productosService.obtenerProductos().subscribe(response => {
      this.cargandoDatos = false;
      this.productos = response;
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

  crearProducto(producto: any) {
    this.creando = true;
    this.productosService.crearProducto(producto).subscribe(response => {
      this.obtenerProductos();
      setTimeout(() => {
        this.creando = false;
        this.modalService.dismissAll();
        this.toastService.show('Producto registrado', { classname: 'bg-success text-light', delay: 3000 });
      }, 1000);
    });
  }

  eliminarProducto(producto: any) {
    producto.eliminando = true;
    this.productosService.eliminarProducto(producto.id).subscribe(response => {
      this.obtenerProductos();
      setTimeout(() => {
        this.toastService.show('Producto eliminado', { classname: 'bg-success text-light', delay: 3000 });
      }, 1000);
    })
  }
}
