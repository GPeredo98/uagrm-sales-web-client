import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  clientes: any[] = [];

  nuevoCliente: any = {
    nombre: '',
    apellido: '',
    direccion: '',
    ciudad: 0,
    codigoPostal: 0,
    pais: 'MODA',
    telefono: true
  };

  constructor(private clientesService: ClientesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clientesService.obtenerClientes().subscribe(response => {
      if (response.success) {
        this.clientes = response.data;
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.obtenerClientes();
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

  crearCliente(cliente: any) {
    this.clientesService.crearCliente(cliente).subscribe(response => {
      if (response.success) {
        this.clientes.push(response.data);
        this.obtenerClientes();
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.crearCliente(cliente);
        }
      }
    });
  }

  eliminarCliente(id: number) {
    this.clientesService.eliminarCliente(id).subscribe(response => {
      if (response.success) {
        this.obtenerClientes();
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.eliminarCliente(id);
        }
      }
    })
  }
}
