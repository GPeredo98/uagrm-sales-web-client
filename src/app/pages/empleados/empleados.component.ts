import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent {
  empleados: any[] = [];

  nuevoEmpleado: any = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    fechaContratacion: 0,
    cargo: 0,
    salario: 0,
    direccion: ''
  };

  constructor(private empleadoService: EmpleadosService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe(response => {
      if (response.success) {
        this.empleados = response.data;
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.obtenerEmpleados();
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
  crearEmpleado(producto: any) {
    this.empleadoService.crearEmpleado(producto).subscribe(response => {
      if (response.success) {
        this.empleados.push(response.data);
        this.obtenerEmpleados();
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.crearEmpleado(producto);
        }
      }
    });
  }

  eliminarProducto(id: number) {
    this.empleadoService.eliminarEmpleado(id).subscribe(response => {
      if (response.success) {
        this.obtenerEmpleados();
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.eliminarProducto(id);
        }
      }
    })
  }
}
