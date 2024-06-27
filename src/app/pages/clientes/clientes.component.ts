import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  clientes: any[] = [];
  cargandoDatos: boolean = true;
  creando: boolean = false;

  nuevoCliente: any = {};

  constructor(
    private clientesService: ClientesService,
    private modalService: NgbModal,
    public toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clientesService.obtenerClientes().subscribe(response => {
      this.clientes = response;
      this.cargandoDatos = false;
    });
  }

  openModal(content: any) {
    this.nuevoCliente = {};
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'Save click') {
        // Aquí puedes llamar a un método para guardar el nuevo producto
      }
    }, (reason) => {
      // Manejar el cierre del modal
    });
  }

  crearCliente(cliente: any) {
    this.creando = true;
    this.clientesService.crearCliente(cliente).subscribe(response => {
      this.obtenerClientes();
    }, error => {
      for (let key in error.error.errors) {
        error.error.errors[key].forEach((message: any) => {
            this.toastService.show(`${key}: - ${message}`, { classname: 'bg-danger text-light', delay: 15000 });
        });
      }
    }).add(() => {
      this.creando = false;
    });
  }

  eliminarCliente(cliente: any) {
    cliente.eliminando = true;
    this.clientesService.eliminarCliente(cliente.id).subscribe(response => {
      this.obtenerClientes();
      setTimeout(() => {
        this.toastService.show('Cliente eliminado', { classname: 'bg-success text-light', delay: 3000 });
      }, 1000);
    })
  }
}
