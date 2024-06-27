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
  creando: boolean = false;

  nuevoEmpleado: any = {
    nombre: '',
    apellido: '',
    fechaNacimiento: 0,
    fechaContratacion: 0,
    cargo: '',
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
    this.nuevoEmpleado = {
      nombre: '',
      apellido: '',
      fechaNacimiento: 0,
      fechaContratacion: 0,
      cargo: '',
      salario: 0,
      direccion: ''
    };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'Save click') {
        // Aquí puedes llamar a un método para guardar el nuevo producto
      }
    }, (reason) => {
      // Manejar el cierre del modal
    });
  }

  crearEmpleado(producto: any) {
    this.creando = true;
    this.empleadoService.crearEmpleado(producto).subscribe(response => {
      this.obtenerEmpleados();
      setTimeout(() => {
        this.modalService.dismissAll();
        this.toastService.show('Empleado registrado', { classname: 'bg-success text-light', delay: 3000 });
      }, 1000);
    }, error => {
      for (let key in error.error.errors) {
        error.error.errors[key].forEach((message: any) => {
            this.toastService.show(`${key}: - ${message}`, { classname: 'bg-danger text-light', delay: 3000 });
        });
      }
    }).add(() => {
      this.creando = false;
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
