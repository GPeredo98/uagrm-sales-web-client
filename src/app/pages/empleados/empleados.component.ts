import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent {
  empleados: any[] = [];
  cargandoDatos: boolean = true;

  nuevoEmpleado: any = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    fechaContratacion: 0,
    cargo: 0,
    salario: 0,
    direccion: ''
  };

  constructor(
    private empleadoService: EmpleadosService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe(response => {
      this.empleados = response;
      this.cargandoDatos = false;
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

  eliminarEmpleado(empleado: any) {
    empleado.eliminando = true;
    this.empleadoService.eliminarEmpleado(empleado.id).subscribe(response => {
      this.obtenerEmpleados();
      setTimeout(() => {
        this.toastService.show('Empleado eliminado', { classname: 'bg-success text-light', delay: 3000 });
      }, 1000);
    })
  }
}
